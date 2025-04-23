Ext.application({
    name: 'AitiGuru',
    extend: 'Ext.app.Application',
    
    requires: [
        'AitiGuru.view.login.Login',
        'AitiGuru.store.Products',
        'AitiGuru.view.main.Main',
        'AitiGuru.view.main.ProductsTab',
        'AitiGuru.view.main.ProductCard'
    ],
    
    controllers: ['MainController'],
    
    launch: function() {
        Ext.create('AitiGuru.view.login.Login');
    }
});