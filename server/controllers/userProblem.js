const problem=require("../models/problem")
const submission=require("../models/submission")
const {getlanguagebyId,submitBatch,submitToken}=require("../utils/problemUtility");
const User=require("../models/User")

const createProblem=async(req,res)=>{
     const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases = [],
    hiddenTestCases = [],
    startCode = [],
    refrenceSolution = []
  } = req.body;



    try{

        for(const {language,completeCode} of refrenceSolution){
            console.log(language,completeCode);
            const languageId= await getlanguagebyId(language);
            console.log(languageId)


                 /// i m creating batch submission for each language
            const submissions=visibleTestCases.map((testcases)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output,
            }))


            const submitResult= await submitBatch(submissions);

            
            

            const resulttoken=submitResult.map((value)=>value.token);

            const testResult= await submitToken(resulttoken);
            console.log(testResult);

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("Error Occured")
                }
            }


        }

        //we can store the problem in database

       const userProblem= await problem.create({...req.body,problemCreator:req.result._id});

        res.status(201).send("Problem Created Successfully");

    }
    catch(err){
        res.status(400).send("Error Occured: "+err.message);
    }
}

const problemUpdate=async(req,res)=>{

    const {id}=req.params;
    console.log(id);

    const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases = [],
    hiddenTestCases = [],
    startCode = [],
    refrenceSolution = []
      } = req.body;
    try{

        if(!id){
            return res.status(400).send("Problem ID is required");
        }
         const DsaProblem=await problem.findById(id);

         if(!DsaProblem){
            return res.status(404).send("Problem not found");
         }


        for(const {language,completeCode} of refrenceSolution){
            const languageId= await getlanguagebyId(language);


                 /// i m creating batch submission for each language
            const submissions=visibleTestCases.map((testcases)=>({
                source_code:completeCode,
                language_id:languageId,
                stdin:testcases.input,
                expected_output:testcases.output,
            }))


            const submitResult= await submitBatch(submissions);

            // console.log(submitResult);
            

            const resulttoken=submitResult.map((value)=>value.token);

            const testResult= await submitToken(resulttoken);
             console.log(testResult);

            for(const test of testResult){
                if(test.status_id!=3){
                    return res.status(400).send("Error Occured")
                }
            }


        }

        const newProblem=await problem.findByIdAndUpdate(id,{...req.body},{runValidators:true,new:true});

        res.status(200).send(newProblem);

        

         
        

    }
    catch(err){
        res.status(400).send("Error Occured: "+err.message);
    }
}

const deleteProblem=async(req,res)=>{{
    const{id}=req.params;
    

    try{

        if(!id){
            return res.status(400).send("Problem ID is required");
        }
         const deletedProblem=await problem.findByIdAndDelete(id);

         if(!deletedProblem){
            return res.status(404).send("Problem not found");
         }

         return res.status(200).send("Problem deleted successfully");
    }
    catch(err){
        res.status(400).send("Error Occured: "+err);
    }
}}

const getProblemById=async(req,res)=>{
    const {id}=req.params;
    try{

        if(!id){
            return res.status(400).send("Problem ID is required");
        }
         const getProblem=await problem.findById(id).select('_id title description difficulty tags visibleTestCases startCode refrenceSolution');
         if(!getProblem){
            return res.status(400).send("Problem not found")
         }

         res.status(200).send(getProblem)
    }
    catch(err){
        res.status(400).send("Error Occured: "+err);
    }
}

const getAllProblem=async(req,res)=>{
    
    try{

    
         const getProblem=await problem.find({}).limit(20);
        //  if(getProblem.length==0){
        //     return res.status(400).send("Problem not found")
        //  }
             const formattedProblems = getProblem.map((p) => ({
                  id: p._id,
                  title: p.title,
                  difficulty: p.difficulty,
                  tags: p.tags,
                  visibleTestCases:p.visibleTestCases,
                  hiddenTestCases:p.hiddenTestCases,
                  refrenceSolution:p.refrenceSolution,
                  startCode:p.startCode,
                  description:p.description


                  }));

         res.status(200).json({
            reply:formattedProblems,
            message:"Get The Problem"
         })
    }
    catch(err){
        res.status(400).send("Error Occured: "+err);
    }
}

const solvedProblemByUser=async(req,res)=>{

    try{
        // const count=req.result.problemSolved.length;
        // res.status(200).send(count);

        const userId=req.result._id;
        const user=await User.findById(userId).populate({
            path:"problemSolved",
            select:"_id title difficulty tags"
        })

    }
    catch(err){
        res.status(401).send("Internal Server Error"+err)

    }


}

module.exports={createProblem,problemUpdate,getProblemById,deleteProblem,getAllProblem,solvedProblemByUser};