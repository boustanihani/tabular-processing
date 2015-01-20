Books = new Mongo.Collection('books');

TabularTables = {};

TabularTables.Books = new Tabular.Table({
    name: "BookList",
    collection: Books,
    columns: [{
        data: "title",
        title: "Title"
    }, {
        data: "author",
        title: "Author"
    }, ]
});

if (Meteor.isClient) {

    Template.registerHelper('TabularTables', TabularTables);

    Template.registerHelper('processing', function() {
        return Session.get('processing');
    });

    // https://datatables.net/reference/event/processing
    $(window).on('processing.dt', function(e, settings, proc) {
        console.log(new Date() + ' processing.dt=' + proc);
        if (proc) {
            console.time('processing.dt=true');
        } else {
            console.timeEnd('processing.dt=true');
        }
        Session.set('processing', proc);
    });

}

if (Meteor.isServer) {
    var count = Books.find().count();
    console.log('Books count:', count);

    if (count == 0) {

        for (var i = 1; i <= 200; i++) {
            Books.insert({
                title: 'Titel-' + i,
                author: 'Author-' + i
            });
        }
    }
}
