
var app = new Vue ({

    el : '#root' ,

    data : {

        currentContact : 0 ,
        visibleUsers : 0 ,
        newMessage : '' ,
        userQuery : '' ,

        loggedUser : {
            name: 'Maurizio',
            avatar: '_io'
        } ,

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

        activeMessage : {
            index    : false ,
            showMenu : false
        }

    } , // data

    created : function() {
        this.visibleCount();
        this.stringToArray();
     } ,

    methods : {
        
        // Metodi che vengono invocati alla creazione

        stringToArray() {
            this.contacts.forEach( contact => {
                contact.messages.forEach( message => {
                    message.status = [message.status];
                });
            });
        } ,
        
        visibleCount() {
            this.visibleUsers = this.contacts.length;

            this.contacts.forEach( (contact) => {
                if(!contact.visible) {
                    this.visibleUsers --;
                }
            });
        } ,

        // Metodi riguardanti la gestione del menu a tendina del messaggio

        openMenu(index) {
            this.activeMessage.index = index;
            this.activeMessage.showMenu = true;
        } ,
        
        closeMenu() {
            this.activeMessage.index = false;
            this.activeMessage.showMenu = false;
        } ,
        
        // Metodi riguardanti visualizzazione ed attivazione dei contatti

        setCurrentContact(contact) {
            this.currentContact = contact;
        } ,

        setVisibility() {
            this.contacts.forEach( (contact) => {
                if( contact.name.toLowerCase().search(this.userQuery.toLowerCase()) == -1 ) contact.visible = false;
                else contact.visible = true;
            });
            
            this.visibleCount();
        } ,       
        
        // Metodi riguardanti l'invio e la ricezione di nuovi messaggi

        sendNewMessage() {            
            if(this.newMessage != '') {
                
                this.contacts[this.currentContact].messages.push({
                    date : this.getDate() ,
                    text : this.newMessage ,
                    status : ['sent']
                });
                
                this.newMessage = '';
                this.getNewMessage('Ok');
            }
        } ,
                
        getNewMessage(messageContent) {
            setTimeout(() => {
                this.contacts[this.currentContact].messages.push({
                    date : this.getDate() ,
                    text : messageContent ,
                    status : ['received']
                });
            }, 1000);
        } ,
        
        removeMessage(message) {
            message.status.push('removed');
            message.text="<em>Questo Messaggio è stato eliminato</em>";
        } ,

        // Metodi riguardanti la gestione della data e dell'orario

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
        }
    }   // methods

    });