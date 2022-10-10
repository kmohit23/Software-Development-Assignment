// Find the longest palindrome from the given string. 
// Palindrome is a word, phrase, or sequence that reads the  same backwards as forwards, e.g. madam, civic, radar


function pallindrome(string){
    let longestPallindrome="";
    for(let i=0 ;i<string.length;i++){
        // for if the string is odd 
        let oddString=expandFromCenter(string,i,i)  
        // If the srting is even
        let evenString=expandFromCenter(string,i-1,i)

        if(oddString.length>longestPallindrome.length){
            longestPallindrome=oddString;
        }
        if(evenString.length>longestPallindrome.length){
            longestPallindrome=evenString
        }
    }
    return longestPallindrome
}
function expandFromCenter(string,left,right){
    let i=0;
    while(string[left-i]&&string[left-i]===string[right+i]){
        i++;
    }
    i--;
    return string.slice(left-i,right+i+1)
}

const longestSubstringPallindrome =pallindrome("abamadam")


console.log(longestSubstringPallindrome)