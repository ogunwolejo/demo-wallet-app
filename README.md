# PROJECT TITLE: AN MVP OF A DIGITAL WALLET

## PROJECT DESCRIPTION 

### This project is a minimum viable product in which user can create an wallet and make withdrawals to there banks,  fund to the wallet and make transfers to other wallets. Futher documentation can be seen in the postman documentation url <https://documenter.getpostman.com/view/6819527/2s83zjsPJx>

### APPLICATION STRUCTURE

#### These application use flutterwave sdk - flutterwave-node-v3 and has about six end-points, which are divided into three folders that 
##### - auth - wallet and - bank folder. The auth contains the /register end-point for new users to create an account, while the /login end-point gives a jwt-token which is used has the bearer token in the end-points in the wallet folder. Its important to note the token is valid foe only 2 hours. The Bank folder contains the lists of banks and bankcode which are needed to be used especially when using the /withdraw-funds end-point to select the bank you want to use. However, since we are using a test-mode, there is a list of accounts in the postman documentation that we can use.


### DATABASE E-R DIAGRAM

#### This is the url to my E-R diagram for this applicaton - [<https://sqlspy.io/import_db_designer/c3B5LTM1NDMxMjMtMjA5ODgwNjQ2M2IzMWExMC01NjU5MTU>](https://sqlspy.io/import_db_designer/c3B5LTM1NDMxMjMtMjA5ODgwNjQ2M2IzMWExMC01NjU5MTU=)
 

