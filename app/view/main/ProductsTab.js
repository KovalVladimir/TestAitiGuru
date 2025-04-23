Ext.define('AitiGuru.view.main.ProductsTab', {
    extend: 'Ext.panel.Panel',
    xtype: 'productstab',
    requires: ['AitiGuru.store.Products'],
    
    title: 'Товары',
    closable: true,
    layout: 'fit',
    
    items: [{
        xtype: 'grid',
        store: 'products',
        border: false,
        
        columns: [
            {text: 'ID', dataIndex: 'id', width: 50},
            {text: 'Наименование', dataIndex: 'name', flex: 1},
            {text: 'Описание', dataIndex: 'description', flex: 2},
            {text: 'Цена', dataIndex: 'price', width: 80, 
             renderer: function(value) { return Ext.util.Format.number(value, '0.00') + ' ₽'; }},
            {text: 'Кол-во', dataIndex: 'quantity', width: 80,
             renderer: function(value) {
                 return value === 0 ? 
                    '<span style="color:red;font-weight:bold;">' + value + '</span>' : 
                    value;
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
                    specialkey: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            var grid = this.up('grid');
                            grid.getStore().clearFilter();
                            if (field.getValue()) {
                                grid.getStore().filter('id', field.getValue());
                            }
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Описание',
                labelWidth: 70,
                margin: '0 0 0 10',
                enableKeyEvents: true,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            var grid = this.up('grid'),
                                value = field.getValue();
                            grid.getStore().clearFilter();
                            if (value) {
                                grid.getStore().filterBy(function(record) {
                                    return record.get('description')
                                        .toLowerCase()
                                        .includes(value.toLowerCase());
                                });
                            }
                        }
                    }
                }
            }]
        }]
    }]
});