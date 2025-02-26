//not work as heavy usage of arrays making and manipulation affecting memory
// export function similarity(str1, str2) {
//   const longer = str1.length >= str2.length ? str1 : str2;
//   const shorter = str1.length < str2.length ? str1 : str2;

//   const longerLength = longer.length;
//   if (longerLength === 0) return 1.0;

//   return (1 - levenshteinDistance(longer, shorter)) / parseFloat(longerLength);
// }

// function levenshteinDistance(str1, str2) {
//   const matrix = [];

//   // Initialize matrix with 0..m
//   for (let i = 0; i <= str2.length; i++) {
//     matrix[i] = [i];
//   }

//   // Initialize matrix with 0..n
//   for (let j = 0; j <= str1.length; j++) {
//     matrix[0][j] = j;
//   }

//   // Calculate Levenshtein distance

//   for (let i = 1; i <= str2.length; i++) {
//     for (let j = 1; j <= str1.length; j++) {
//       if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = Math.min(
//           matrix[i - 1][j - 1] + 1, // Substitution
//           matrix[i][j - 1] + 1, // Insertion
//           matrix[i - 1][j] + 1 // Deletion
//         );
//       }
//     }
//   }

//   return matrix[str2.length][str1.length];
// }



export default function checkSentenceGroupsForSimilarity(sentencesGroup1, sentencesGroup2) {
  const results = [];

  sentencesGroup1.forEach((sentence1) => {
    const sentenceArray1 = sentence1.toLowerCase().split(" ");

    const sentenceResults = [];

    sentencesGroup2.forEach((sentence2) => {
      const sentenceArray2 = sentence2.toLowerCase().split(" ");

      let count = 0;
      let totalWords = sentenceArray2.length;

      sentenceArray1.forEach((word) => {
        if (sentenceArray2.includes(word)) {
          count++;
        }
      });

      if (count > totalWords / 2) {
        sentenceResults.push(true); // More than half of the sentence contains the specified words
      } else {
        sentenceResults.push(false); // Less than half of the sentence contains the specified words
      }
    });

    results.push(sentenceResults);
  });

  return results;
}