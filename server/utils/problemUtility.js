const axios=require("axios");

const getlanguagebyId=(lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63,

    }

    return language[lang.toLowerCase()]
}

const submitBatch=async(submission)=>{
    
  const options = {
  method: 'POST',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    'x-rapidapi-key': 'eee0c059f8mshd46857431204b91p1404c6jsn904c12637385',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    'Content-Type': 'application/json'
  },
  data: {
    submissions:
      submission
}
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();
}

const waiting = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const submitToken=async(resultToken)=>{


    const options = {
  method: 'GET',
  url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
  params: {
    tokens: resultToken.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
    'x-rapidapi-key': 'eee0c059f8mshd46857431204b91p1404c6jsn904c12637385',
    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
  }
};


async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

while(true){

const result=await fetchData();

const resultObtained=result.submissions.every((r)=>r.status_id>2)
if(resultObtained){
    return result.submissions;
}
await waiting(1000);
    
}



}
module.exports={getlanguagebyId,submitBatch,submitToken}