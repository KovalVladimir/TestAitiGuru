Ext.define('AitiGuru.store.Products', {
    extend: 'Ext.data.Store',
    alias: 'store.products',
    
    model: 'AitiGuru.model.Product',
    
    data: [
        { 
            id: 1, 
            name: 'Samsung Galaxy S23 Ultra', 
            description: 'Флагман с 200 МП камерой, Snapdragon 8 Gen 2, 12 ГБ ОЗУ, 6.8" Dynamic AMOLED 2X', 
            price: 1299.99, 
            quantity: 15 
        },
        { 
            id: 2, 
            name: 'iPhone 15 Pro Max', 
            description: 'Apple A17 Bionic, 48 МП основная камера, титановый корпус, 6.7" Super Retina XDR', 
            price: 1599.00, 
            quantity: 8 
        },
        { 
            id: 3, 
            name: 'Xiaomi Redmi Note 12 Pro', 
            description: 'AMOLED 120 Гц, 108 МП камера, Dimensity 1080, 5000 мАч батарея', 
            price: 349.90, 
            quantity: 0 
        },
        { 
            id: 4, 
            name: 'Google Pixel 8 Pro', 
            description: 'Tensor G3, 50 МП камера с ИИ, 6.7" LTPO OLED, встроенный VPN', 
            price: 999.00, 
            quantity: 12 
        },
        { 
            id: 5, 
            name: 'Huawei P60 Pro', 
            description: 'Leica-камера 48 МП, OLED-экран 120 Гц, батарея 4815 мАч, HarmonyOS', 
            price: 1199.50, 
            quantity: 3 
        }
    ]
});