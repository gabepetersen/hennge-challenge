# Report

This document is an explanation of the mail archiver creation process. There are some additional notes at the bottom.

### Process

1. **Deciding the Framework**
    
    I decided to use Angular since I have been using it recently and I am familiar with the Angular Material library.

    > I'll have to admit a mistake: I thought I saw Angular on your guys' tech stack for some reason. 
    > I realize now that React with a library like Ant Design might have been another good setup for this project.

2. **Sorting out Themes**

    Along with the Angular Material Library, I also decided to use SASS for styling. I wanted to learn more about CSS preprocessing, and it has greatly improved the structure of my project. With SASS, I was able to create cleaner styling code and all the project colors are organized neatly under a theme function.
    
3. **Creating the Layout**
    
    One of my initial goals going into the project was to use as many of Angular Material components as possible. Specifically, I wanted to use the functionality of the Datepicker and Form Field to simplify the interaction with input fields, use the Table to display the emails efficiently and use various Buttons to handle click events and animation. I decided to separate my layout into 4 main parts: the filter bar, the sort header, the email count, and the email list.

4. **Email Section**
    * *Angular Mat Table vs Mat List*
    
        I first started to work on the email list section, but then I realized that the Angular Material Table doesn't have much responsive support. Although the Material Table works great with pagination and applying sort mechanisms, I decided to use the Material List with the Material Divider instead. I planned to display the email data using `ngFor` to iterate through emails, and decided to apply a CSS grid structure to each data value. To handle the desktop to mobile view, I displayed the from/to and arrow images as blocks and put them into the grid with a media query.

        > As I worked on the email list section, I had to override some Angular Material styles with the `!important` tag. This is generally considered bad practice, and I had to use more overrides for the filter bar and sort header. For creating future components with a specific function, I am probably going to use a more customizable UI library.
        
    * *Email Data*
        
        For the simulated email data, I used JSON data as an array of objects with the following structure:        
        ```typescript
        {
            "from": "ccc@example.com",
            "to": "xxx@example.com, uuu@example.com, yyy@example.com",
            "reply": [
              {
                "from": "uuu@example.com",
                "to": "ccc@example.com",
                "reply": false,
                "subject": "Re: Happy New Year! Greetings for the New Year.",
                "msg": "Thank you ccc,\n\nI hope you have a good 2020 as well.\n-uuu",
                "attachment": false,
                "date": "January 3 2020 5:23"
              }
            ],
            "subject": "Happy New Year! Greetings for the New Year.",
            "msg": "Hello all!\n\nI hope you have a great 2020!\n\nBest,\n-ccc",
            "attachment": true,
            "date": "January 3 2020 0:00"
        },
        ```
        I decided to not implement a way to view an email reply, but the replies would also follow the same email format.

    * *Email Section - Date Pipe*

        If you look at the date above in the JSON format, the format is not the correct date format. Since we have varying date formats depending on the day, month, or year, I decided to use a custom date pipe to compare the value (in converted milliseconds) to the current date. If you would like to test this pipe against the current day with new data you can edit `var currentDate = new Date("January 3 2020");` in `custom-date.pipe.ts` to the current date (`new Date()`).

5. **Filter Bar**

    For filtering, I decided to filter the email data each time one of the filter changes - whether it be text or by the date. This is the best way for the email list items to appear dynamically on an applied filter. With each of these forms, I again had to apply a lot of overriding styles to format it correctly. As mentioned before, a better approach would have been to create a form component from scratch or use a more customizable library
    
    * *Search Bar Extension*

        I figured that the designer envisioned the search bar to appear when the search logo is clicked. I first attempted to use CSS transforms to move the search bar under the calendar on mobile and to the side on desktop, but I had some issues with positioning and decided to use the max-width transition instead.
        
    * *Date Bar*
        When using the Angular Material Datepicker, I decided to use the Date Range picker because of its smooth and efficient dialog interface.
        
6. **Sort Header**

    For the sort header, I used the same material list + grid structure setup as the email list. After making each of the header titles clickable, I used `[ngClass]` to edit the sort arrow appearance and handle the bold columns.
    
7. **Email Count**

    This section was fairly easy to implement - the resulting count is the length of the filtered data source.
    
8. **Email Dropdown**

    To satisfy Mission 2 of the project, I decided to add a feature so that the user can click on an email list item to show the message of the email appears underneath it. This is to confirm that the text filter does work with the email message, along with giving a simple interface for reading emails. This feature probably has the greatest potential to improve, and I mention in [Improvements](../docs/IMPROVEMENTS.md) that a separate email component would be nice to route to on clicking the email list item.
  
9. **Styling**

    After these components were functional, the rest of the project work was spent on styling components to conform to the design file. 


### Note: Using Custom Date Inputs

When I converted the date format in the calendar range input, I used this to format the date correctly in `app.module.ts`.
```typescript
import {MAT_DATE_LOCALE} from '@angular/material/core';
...
providers: [
  ...
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  ],
```

This overrides Japanese as the default language for the Date values in that specific scope. Although this could be confusing for users who use the English date format, I thought it could add a nice touch if most of the audience is used to the Japanese date format. 

If we did not want the date formating to be in Japanese, we could use MatDateFormats and NativeDateAdapter to format the date to YYYY/MM/DD and keep the local format. This is a good [article](https://medium.com/@amandeepkochhar/angular-material-datepicker-set-custom-date-in-dd-mm-yyyy-format-5c0f4340e57) explaining the process. 

