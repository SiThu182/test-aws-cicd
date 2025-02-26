import axios, { AxiosError } from "axios";

export const SearchDictionary = async (word) => {
  const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en";

  try {
    const trimmedWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    let response = await axios.get(baseURL + "/" + trimmedWord);
    let definitions = [];
    let partOfSpeech = [];
    let phonetics = {
      us: undefined,
      ul: undefined,
    };
    let phonetic = "";
    console.log(response, "response");

    response.data[0]?.meanings.forEach((m, mindex) => {
      partOfSpeech[mindex] =
        partOfSpeech[mindex] !== undefined
          ? partOfSpeech[mindex] + "," + m.partOfSpeech
          : m.partOfSpeech;

      m.definitions?.forEach((d, dindex) => {
        definitions.push(d.definition);
      });
    });
    response.data[0]?.phonetics.forEach((p, pindex) => {
      if (p.audio.includes("uk")) {
        phonetics.uk = p.audio;
      } else if (p.audio.includes("us")) {
        phonetics.us = p.audio;
      }
    });

    return (response = {
      definitions: definitions,
      partOfSpeech: partOfSpeech,
      phonetics: phonetics,
      phonetic: response.data[0]?.phonetic,
    });
  } catch (error) {
    let errorMessage = "";
    if (error instanceof AxiosError) {
      errorMessage = "ERROR:" + error?.response?.data?.message;
    } else {
      // Handle other types of errors
      errorMessage = "Unknown error occurred" + error;
    }
    return errorMessage;
  }
};
