Ext.define('AitiGuru.view.login.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',
    
    title: 'Вход в систему',
    width: 300,
    height: 180,
    closable: false,
    resizable: false,
    autoShow: true,
    modal: true,
    layout: 'fit',
    
    items: [{
        xtype: 'form',
        reference: 'form',
        bodyPadding: 15,
        defaults: {
            xtype: 'textfield',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            fieldLabel: 'Логин',
            name: 'username',
            emptyText: 'Введите логин'
        }, {
            fieldLabel: 'Пароль',
            name: 'password',
            inputType: 'password',
            emptyText: 'Введите пароль'
        }],
        buttons: [{
            text: 'Вход',
            formBind: true,
            handler: 'onLoginClick'
        }]
    }]
});