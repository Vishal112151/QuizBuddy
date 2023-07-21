const express = require("express")
const router=express.Router();
const mathQuestions=require("../testpapers/mathematics")
const scienceQuestions=require('../testpapers/science')
const biologyQuestions=require('../testpapers/biology')
const chemistryQuestions=require('../testpapers/chemistry')
const civicsQuestions=require('../testpapers/civics')
const economicsQuestions=require('../testpapers/economics')
const englishQuestions=require('../testpapers/english')
const geographyQuestions=require('../testpapers/geography')
const gkQuestions=require('../testpapers/gk')
const gsQuestions=require('../testpapers/gs')
const hindiQuestions=require('../testpapers/hindi')
const historyQuestions=require('../testpapers/history')
const physicsQuestions=require('../testpapers/physics')
const sanskritQuestions=require('../testpapers/sanskrit')

router.get(`/math`,(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            // console.log(mathQuestions);
           res.send(
                mathQuestions
            )
        } catch (error) {
            
        }
    })
})
router.get('/science',(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            res.send(
                scienceQuestions
            )
        } catch (error) {
            
        }
    })
})
router.get('/hindi',(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            res.send(
                hindiQuestions
            )
        } catch (error) {
            
        }
    })
})

router.get('/english',(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            res.send(
                englishQuestions
            )
        } catch (error) {
            
        }
    })
})


router.get('/science',(req,res)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            res.send(
                scienceQuestions
            )
        } catch (error) {
            
        }
    })
})



module.exports=router