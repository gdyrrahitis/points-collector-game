var Book = function (name, price) {
    //οι πινακες που κρατανε τα callbacks
    var evtPriceChanging = [],
        evtPriceChanged = [];

    this.price = function (val) {
        //αν δεν εχει val σημαινει πως απλα θελω να παρω την τιμη και οχι να την setarw.
        if (typeof val !== 'undefined' && val !== price) {
            //αν η callback φερει false, τοτε σημανει πως υπαρχει θεμα στο logic
            //αρα δεν κανει την αλλαγη και επιστρεφει απλα την τιμη
            for (var i = 0; i < evtPriceChanging.length; i++) {
                if (!evtPriceChanging[i](this, val)) {
                    return price
                }
            }
            //επεστρεψε true το callback οποτε αλλαζω την τιμη
            price = val;
            //ενημερωνω πως η τιμη αλλαξε
            for (var j = 0; j < evtPriceChanged.length; j++) {
                evtPriceChanged[j](this);
            }
        }
        //επιστρεφω την τιμη
        return price;
    };

    this.name = function (val) {
        return name;
    };

    this.onChanging = function (callback) {
        evtPriceChanging.push(callback);
    };

    this.onChanged = function (callback) {
        evtPriceChanged.push(callback)
    };
};

//χρησιμοποιω το api
var book = new Book('Javascript the good parts', 10);
console.log(book.name() + ' €' + book.price());

book.onChanging(function (b, val) {
    if (val > 100) {
        console.log('Price is too high')
        return false;
    }
    console.log('Price is changing!')
    return true;
});

book.onChanged(function (b) {
    console.log('Price changed to: €' + b.price());
});

book.price(20);
setTimeout(function () {
    book.price(101);
}, 5000)