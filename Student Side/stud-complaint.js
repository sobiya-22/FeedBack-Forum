export function generateRandomNumber() { 
    // Generate a random number between 0 and 9999999999 (inclusive) 
    let randomNumber = Math.floor(Math.random() * 10000000000); 
 
    // Convert the number to a string 
    let randomString = randomNumber.toString(); 
 
    // If the number has less than 10 digits, pad it with leading zeros 
    while (randomString.length < 10) { 
        randomString = '0' + randomString; 
    } 
 
    return randomString;
 }