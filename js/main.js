
var app = new Vue ({

    el : '#root' ,

    data : {

        currentContact : 0 ,
        newMessage : '' ,
        userQuery : '' ,

        loggedUser : {
            name: 'Maurizio',
            avatar: '_io'
        } ,

        visibleUsers : 0 ,

        contacts : [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            }
        ] ,
    } , // data

    created : function() {
        this.visibleCount();
        this.closeMenu();
        
     } ,

    methods : {

        removeMessage(message) {
            message.text = 'Questo messaggio è stato eliminato';
            this.closeMenu();
        } ,

        closeMenu() {
            
            this.contacts.forEach( contact => {

                contact.messages.forEach( message => {
                    message.text += ' ';
                    // Accrocchio: Nella riga sopra ho dovuto modificare (senza alcun senso) il DOM.
                    // Altrimenti, pur cambiando la variabile menuOpen (riga sotto) non viene assegnata dinamicamente la classe corrispondente!
                    message.menuOpen = false;
                });
    
            } );    
        } ,

        openMenu(contact , message) {
            this.closeMenu();
            this.contacts[contact].messages[message].text += ' ';   
            // Accrocchio: Nella riga sopra ho dovuto modificare (senza alcun senso) il DOM. Vedi descrizione sopra, nel metodo closeMenu()
            this.contacts[contact].messages[message].menuOpen = true;
        } ,

        setVisibility() {
            this.contacts.forEach( (contact) => {
                if( contact.name.toLowerCase().search(this.userQuery.toLowerCase()) == -1 ) contact.visible = false;
                else contact.visible = true;
            });

            this.visibleCount();
        } ,
        
        visibleCount() {        
            this.visibleUsers = this.contacts.length;
            
            this.contacts.forEach( (contact) => {
                if(!contact.visible) {
                    this.visibleUsers --;
                }
            });
        } ,

        setCurrentContact(contact) {
            this.currentContact = contact;
        } , 

        sendNewMessage() {

            if(this.newMessage != '') {

                this.contacts[this.currentContact].messages.push({
                    date : this.getDate() ,
                    text : this.newMessage ,
                    status : 'sent'
                });

                this.newMessage = '';
                setTimeout( function() {app.getNewMessage()} , 1000);   
                // Accrocchio: this.getNewMessage() dà errore. 
                // Con 'app' al posto di 'this' funziona. (Perché?)
            }
        } , 

        getDate() {
            var date = new Date;

            return +
            this.normalizeDate( date.getDate()    ) + '/' + 
            this.normalizeDate((date.getMonth()+1)) + '/' + 
            this.normalizeDate( date.getFullYear()) + ' ' + 
            this.normalizeDate( date.getHours()   ) + ':' +
            this.normalizeDate( date.getMinutes() ) + ':' +       
            this.normalizeDate( date.getSeconds() );
        } ,

        normalizeDate(myString) {
                myString = String(myString);
                if(myString.length == 1) myString = '0' + myString;
                return myString;
        } ,

        getNewMessage() {
                this.contacts[this.currentContact].messages.push({
                    date : this.getDate() ,
                    text : 'OK' ,
                    status : 'received'
                });
        }
    }   // methods

    });