import firebase from 'firebase/app';

// Adds a new journal entry to the data base
export function addJournalEntry(userID, entryDetails) {
        let newEntry = {
            producer : entryDetails.producer,
            origin : entryDetails.origin,
            tastingNotes : entryDetails.tastingNotes,
            rating : entryDetails.rating,
            text : entryDetails.text,
            date : entryDetails.date,
            barName : entryDetails.barName
        }
        console.log(newEntry);
        // let channelsRef = firebase.database().ref('channels');
        // channelsRef.push(newChannel);
        // return newChannel;
    }