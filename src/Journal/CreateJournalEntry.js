import firebase from 'firebase/app';

// Adds a new journal entry to the data base
export function addJournalEntry(user, entryDetails) {
    let newEntry = {
        producer : entryDetails.producer,
        origin : entryDetails.origin,
        tastingNotes : entryDetails.tastingNotes,
        rating : entryDetails.rating,
        text : entryDetails.text,
        date : entryDetails.date,
        barName : entryDetails.barName
    }
    let userJournalRef = firebase.database().ref('userData/' + user.uid + '/userJournalEntries/');
    userJournalRef.push(newEntry);
}
