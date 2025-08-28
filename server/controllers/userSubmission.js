const { status } = require("init");
const problem = require("../models/problem");
const submission=require("../models/submission");
const { getlanguagebyId, submitBatch, submitToken } = require("../utils/problemUtility");

const userSubmission=async(req,res)=>{
    try{
        const { code, language } = req.body;
        const userId=req.result._id;
        const problemId = req.params.id;
        //console.log(userId, problemId, code, language);

        if(!userId || !problemId || !code || !language){
            return res.status(400).send("All fields are required");
        }

        //fetch the problem from the database

        const problemData=await problem.findById(problemId);
        ///testCases(Hidden) is an array of test cases
       // console.log(problemData);
        if (!problemData) {
      throw new Error("Problem not found");
}

        const UserSubmission = await submission.create({
            userId,
            problemId,
            code,
            language,
            status:"pending",
            testCasesTotal:problemData.hiddenTestCases.length,
        })

        const languageId= await getlanguagebyId(language);


                 /// i m creating batch submission for each language
            const submissions=problemData.hiddenTestCases.map((testcases)=>({
                source_code:code,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output,
            }))

            const submitResult= await submitBatch(submissions);

            // console.log(submitResult);
            

            const resulttoken=submitResult.map((value)=>value.token);

            const testResult= await submitToken(resulttoken);

            let testCases=0;
            let runtime=0;
            let memory=0;
            let errorMessage="";

            ///submittedResult 
            for(const test of testResult){
                if(test.status._id==3){
                    testCases++;
                    runtime=runtime+parseFloat(test.time);
                    memory=Math.max(memory,test.memory)

                }
                else{
                    if(test.status._id==4){
                        status='error';
                        errorMessage=test.stderr;

                    }
                    if(test.status._id==5){
                        status='error';
                        errorMessage=test.stderr;
                    }
                }
            }

            ///
            UserSubmission.status=status;
            UserSubmission.runtime=runtime;
            UserSubmission.error=errorMessage;
            UserSubmission.testCases=testCases;
            UserSubmission.memory=memory;

            await UserSubmission.save();
            //problemId ko push karegaa user schema ma

            if(!req.result.problemSolved.includes(problemId)){
                req.result.problemSolved.push(problemId);
                await req.result.save();
            }

            res.status(201).send("Submitted Result");



    }
    catch(err){
        res.status(500).send("Internal Server Error: " + err.message);
    }
}

const runCode=async(req,res)=>{
     try{
        const { code, language } = req.body;
        const userId=req.result._id;
        const problemId = req.params.id;
        //console.log(userId, problemId, code, language);

        if(!userId || !problemId || !code || !language){
            return res.status(400).send("All fields are required");
        }

        //fetch the problem from the database

        const problemData=await problem.findById(problemId);
        ///testCases(Hidden) is an array of test cases
       // console.log(problemData);
        if (!problemData) {
      throw new Error("Problem not found");
}

        const languageId= await getlanguagebyId(language);


                 /// i m creating batch submission for each language
            const submissions=problemData.visibleTestCases.map((testcases)=>({
                source_code:code,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output,
            }))

            const submitResult= await submitBatch(submissions);

            // console.log(submitResult);
            

            const resulttoken=submitResult.map((value)=>value.token);

            const testResult= await submitToken(resulttoken);


            res.status(201).send(testResult);



    }
    catch(err){
        res.status(500).send("Internal Server Error: " + err.message);
    }
}


module.exports = {userSubmission,runCode};