Ext.define('AitiGuru.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'app-main',
    
    requires: [
        'Ext.tab.Panel'
    ],
    
    layout: 'border',
    
    items: [{
        region: 'north',
        xtype: 'toolbar',
        items: [{
            text: 'Товары',
            handler: 'onProductsClick'
        }, '->', {
            text: 'Выход',
            handler: 'onLogoutClick'
        }]
    }, {
        region: 'center',
        xtype: 'tabpanel',
        reference: 'mainTabPanel'
    }]
});