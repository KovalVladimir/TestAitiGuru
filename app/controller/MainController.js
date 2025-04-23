Ext.define('AitiGuru.controller.MainController', {
    extend: 'Ext.app.Controller',
    
    requires: [
        'Ext.window.Window',
        'Ext.form.Panel',
        'Ext.grid.Panel',
        'Ext.data.Store',
        'AitiGuru.store.Products' 
    ],
    
    views: [
        'login.Login',
        'main.Main',
        'main.ProductCard'
    ],
    
    refs: [{
        ref: 'loginWindow',
        selector: 'login'
    }, {
        ref: 'mainView',
        selector: 'app-main'
    }],
    
    init: function() {
        this.control({
            'login button[text=Вход]': {
                click: this.onLoginClick
            },
            'app-main button[text=Выход]': {
                click: this.onLogoutClick
            },
            'app-main button[text=Товары]': {
                click: this.onProductsClick
            },
            'grid': {
                cellclick: this.onProductNameClick
            }
        });
    },
    
    onLoginClick: function(button) {
        var form = button.up('form').getForm();
        if (form.isValid()) {
            var values = form.getValues();
            if (values.username === 'admin' && values.password === 'padmin') {
                this.getLoginWindow().close();
                Ext.create('AitiGuru.view.main.Main');
            } else {
                Ext.Msg.alert('Ошибка', 'Неверный логин или пароль');
            }
        }
    },
    
    onLogoutClick: function() {
        var viewport = Ext.ComponentQuery.query('viewport')[0];
        if (viewport) {
            viewport.destroy();
        }
        Ext.create('AitiGuru.view.login.Login', {
            autoShow: true
        });
    },
    
    onProductsClick: function() {
        var mainView = this.getMainView();
        if (!mainView) {
            console.error('Main view not found');
            return;
        }
        
        var tabPanel = mainView.down('tabpanel');
        if (!tabPanel) {
            console.error('Tab panel not found');
            return;
        }
        
        var store = Ext.create('AitiGuru.store.Products');
        
        var newTab = tabPanel.add({
            xtype: 'panel',
            title: 'Товары ',
            closable: true,
            layout: 'fit',
            items: [{
                xtype: 'grid',
                store: store,
                columns: [
                    {text: 'ID', dataIndex: 'id', width: 50},
                    {text: 'Наименование', dataIndex: 'name', flex: 1, 
                     renderer: function(value) {
                         return '<span class="product-link" style="color:#1976D2;cursor:pointer;">' + value + '</span>';
                     }},
                    {text: 'Описание', dataIndex: 'description', flex: 2},
                    {text: 'Цена', dataIndex: 'price', width: 80, 
                     renderer: function(v) { return v.toFixed(2); }},
                    {text: 'Кол-во', dataIndex: 'quantity', width: 80,
                     renderer: function(v) { 
                         return v === 0 ? '<span style="color:red">' + v + '</span>' : v; 
                     }}
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        xtype: 'numberfield',
                        fieldLabel: 'ID товара',
                        labelWidth: 70,
                        enableKeyEvents: true,
                        listeners: {
                            specialkey: this.onIdFilterEnter
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Описание',
                        labelWidth: 70,
                        enableKeyEvents: true,
                        listeners: {
                            specialkey: this.onDescFilterEnter
                        }
                    }]
                }]
            }]
        });
        
        newTab.show();
    },
    
    onIdFilterEnter: function(field, e) {
        if (e.getKey() === e.ENTER) {
            var grid = field.up('grid'),
                store = grid.getStore(),
                value = field.getValue();
            
            store.clearFilter();
            if (value) {
                store.filter('id', value);
            }
        }
    },
    
    onDescFilterEnter: function(field, e) {
        if (e.getKey() === e.ENTER) {
            var grid = field.up('grid'),
                store = grid.getStore(),
                value = field.getValue();
            
            store.clearFilter();
            if (value) {
                store.filterBy(function(record) {
                    return record.get('description').toLowerCase().includes(value.toLowerCase());
                });
            }
        }
    },
    
    onProductNameClick: function(grid, td, cellIndex, record) {
        if (cellIndex === 1) { 
            this.showProductCard(record);
        }
    },
    
    showProductCard: function(record) {
        var editableRecord = record.copy();
        
        var card = Ext.create('Ext.window.Window', {
            title: 'Карточка товара: ' + record.get('name'),
            width: 400,
            modal: true,
            layout: 'fit',
            items: [{
                xtype: 'form',
                reference: 'productForm',
                bodyPadding: 15,
                defaults: {
                    xtype: 'textfield',
                    anchor: '100%',
                    labelWidth: 100
                },
                items: [{
                    fieldLabel: 'ID',
                    name: 'id',
                    value: editableRecord.get('id'),
                    readOnly: true
                }, {
                    fieldLabel: 'Имя',
                    name: 'name',
                    value: editableRecord.get('name'),
                    readOnly: true
                }, {
                    fieldLabel: 'Описание',
                    name: 'description',
                    value: editableRecord.get('description'),
                    readOnly: true
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Цена',
                    name: 'price',
                    value: editableRecord.get('price'),
                    minValue: 0,
                    decimalPrecision: 2,
                    allowBlank: false,
                    listeners: {
                        change: function(field, newValue) {
                            if (newValue < 0) {
                                Ext.Msg.alert('Ошибка', 'Цена не может быть отрицательной');
                                field.setValue(0);
                                return;
                            }
                            editableRecord.set('price', newValue);
                        },
                        blur: function(field) {
                            var value = field.getValue();
                            if (value < 0) {
                                Ext.Msg.alert('Ошибка', 'Цена не может быть отрицательной');
                                field.setValue(0);
                                editableRecord.set('price', 0);
                            }
                        }
                    }
                }, {
                    xtype: 'numberfield',
                    fieldLabel: 'Кол-во',
                    name: 'quantity',
                    value: editableRecord.get('quantity'),
                    minValue: 0,
                    allowDecimals: false,
                    allowBlank: false,
                    listeners: {
                        change: function(field, newValue) {
                            if (newValue < 0) {
                                Ext.Msg.alert('Ошибка', 'Количество не может быть отрицательным');
                                field.setValue(0);
                                return;
                            }
                            editableRecord.set('quantity', newValue);
                        },
                        blur: function(field) {
                            var value = field.getValue();
                            if (value < 0) {
                                Ext.Msg.alert('Ошибка', 'Количество не может быть отрицательным');
                                field.setValue(0);
                                editableRecord.set('quantity', 0);
                            }
                        }
                    }
                }],
                buttons: [{
                    text: 'Отмена',
                    handler: function() {
                        this.up('window').close();
                    }
                }, {
                    text: 'Сохранить',
                    handler: function() {
                        this.saveChanges(record, editableRecord);
                    },
                    scope: this
                }]
            }]
        });
        
        card.show();
    },
    
    saveChanges: function(originalRecord, editedRecord) {
        var changes = {};
        var changed = false;
        
        ['price', 'quantity'].forEach(function(field) {
            if (originalRecord.get(field) !== editedRecord.get(field)) {
                changes[field] = editedRecord.get(field);
                changed = true;
            }
        });
        
        if (changed) {
            Ext.Msg.confirm('Сохранение', 'Сохранить изменения?', function(btn) {
                if (btn === 'yes') {
                    originalRecord.set(changes);
                    
                    originalRecord.store.sync();
                    
                    this.up('window').close();
                }
            }, this);
        } else {
            this.up('window').close();
        }
    }
});