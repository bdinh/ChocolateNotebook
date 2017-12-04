// import firebase from 'firebase/app';

// // Adds a new journal entry to the data base
// export function addJournalEntry(user, entryDetails) {
//     let newEntry = {
//         producer : entryDetails.producer,
//         origin : entryDetails.origin,
//         tastingNotes : entryDetails.tastingNotes,
//         rating : entryDetails.rating,
//         text : entryDetails.text,
//         date : entryDetails.date,
//         barName : entryDetails.barName
//     }
//     // Get key corresponding to user email and push data 
    
//     let dataKey;
//     let userDataRef = firebase.database().ref('userData');
//     userDataRef.on('value', (snapshot) => {
//         let data = {individualUsersData: snapshot.val()};   
//         for (var propertyName in data.individualUsersData) {
//             if (data.individualUsersData[propertyName].userName === user.email) {
//               dataKey = data.individualUsersData[propertyName].userName;
//             }
//         }
//     });
        
//     // firebase.database().ref('userData/' + key + '/userJournalEntries').push(newEntry);
    
//     userDataRef.off();
// }