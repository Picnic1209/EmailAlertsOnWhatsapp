
# EmailAlertsOnWhatsapp

## About
This repository contains the code which fetches recent mails from a user's gmail account and send it to his/her Whatsapp account using [Twilio environment](https://www.twilio.com)

## Prerequistics
#### App Passwords

You can read more about it [here](https://support.google.com/accounts/answer/185833?hl=en)

## Setup
1. Create [Twilio Account](https://www.twilio.com) and connect your whatsapp number to it (It's free)
2. Go through the guide they provide and connect your whatsapp number such that you can send a message to the number and receive a message(Initially it would be something along the lines of "You send <your_message>")
3. Navigate to the function page through the navigation bar at the left

![FunctionScreen](https://user-images.githubusercontent.com/65505331/126808198-6072b85f-f68b-48ae-95bf-234fe7427175.PNG)

4. Create a new function (with any name you like) and copy the code in there.
5. Inside the functions page, go to settings->Dependencies and make sure you have all the dependencies added as shown in the figure

![dependencies](https://user-images.githubusercontent.com/65505331/126808660-2ca78dd1-ff22-47ed-8684-d1f8e11d7770.PNG)

6. Now go to settings->Environment Variables and then set emailID as your GMail id and passKey as your App Password(If you don't know about app passwords please read the pre-requistic paragraph above)

![environment variables](https://user-images.githubusercontent.com/65505331/126808823-5fb81434-eac2-4764-942d-affa800e6485.PNG)

7. Save and select Deploy all
8. Select the 'Copy URL' present just below the code editor to copy the link of the function after deploying.
9. Now go to Programmable Messages->Settings->Whatsapp Sandbox Settings and paste the copied URL in step 8 into the 'WHEN A MESSAGE COMES IN' field in Sandbox Configuration
10. Save and you are good to go


## Features/Working
The chatbot searches for keywords and replies accordingly. The followinf keyword are currently implemented.
1. Help : This gets the list of all keyword

![helpKeyword](https://user-images.githubusercontent.com/65505331/126810823-327886ab-c166-47bf-b32c-8bc7a98c0928.PNG)

2. mail/email : This gets the recent 5 emails

![mails keyword](https://user-images.githubusercontent.com/65505331/126810976-a9c4e16c-6d26-4453-8373-2361c899b157.PNG)

3. mail/email + unseen : This gets the latest 5 unseen emails

![unseen+mail keyword](https://user-images.githubusercontent.com/65505331/126811019-cf0e970e-08ec-47db-90bc-02c37365ab01.PNG)

4. Hello/Hey : This just greets you and asks if you want to get mails. If you type es then it fetches the mails.

![hello keyword](https://user-images.githubusercontent.com/65505331/126811127-784f4b98-a710-47eb-97d8-0f863090cb35.PNG)

## Future Plans
* Add more functionalities/options with the email type being queried
* Using some algorithm/AI to predict what the user is asking and reply accordingly. Currently it is hardcoded.
* Add more features apart from email fetching (like weather, film reviews/recommendations) and turn it into a whatsapp assistant.




