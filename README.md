# Board-Infinity-Hackathon-Problem

# Day 1(8/9/2020):-

->Setup the backend Server.
->Connected to mongoDB.
->Made the routings.
->Made the display page.

# Day 2(9/9/2020):-

->Made the duration calculating.
->Delete the data at the calculated time.

# Approach/Method:-

I used node-cron npm package to schedule the job to delete the data at the particular time calculated after getting the duration(in minutes) input from the user. I fetched the current date and time and then calculated the time after the duration and then scheduled the job to delete the particular task when the duration is complete.
