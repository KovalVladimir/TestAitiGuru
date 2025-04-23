Ext.define('AitiGuru.view.main.ProductCard', {
    extend: 'Ext.window.Window',
    xtype: 'productcard',
    
    title: 'Карточка товара',
    width: 400,
    height: 300,
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
            readOnly: true
        }, {
            fieldLabel: 'Имя',
            name: 'name',
            readOnly: true
        }, {
            fieldLabel: 'Описание',
            name: 'description',
            readOnly: true
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Цена',
            name: 'price',
            minValue: 0,
            decimalPrecision: 2,
            allowBlank: false
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Кол-во',
            name: 'quantity',
            minValue: 0,
            allowDecimals: false,
            allowBlank: false
        }],
        buttons: [{
            text: 'Отмена',
            handler: 'onCancelClick'
        }, {
            text: 'Сохранить',
            handler: 'onSaveClick'
        }]
    }]
});