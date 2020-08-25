# Report

This document is an explination of my process in creating this mail component. The sections at the end clarify some of my additions to this project.

### Process

1. *Deciding the Framework*
    
    I decided to use Angular since I have been using it recently and I am familiar with the Angular Material library.

    > I'll have to admit one of my mistakes: I thought I saw Angular on your guys' tech stack for some reason. 
    > I realize now that React with a library like Ant Design might have been another good setup for this project.

2. *Sorting out Themes*

    Along with the Angular Material Library, I also decided to use SASS for styling. I wanted to learn more about CSS preprocessing, and it has greatly improved the structure of my project. With SASS, I was able to create cleaner styling code and all the project colors are organized neatly under a theme function.
    
3. *Creating the Layout*
    
    One of my initial goals going into the project was to use as many of Angular Material components as possible. Specifically, I wanted to use the functionality of the Datepicker and Form Field to simplify the interaction with input fields, use the Table to display the emails efficiently, and use various Buttons to handle click events and animation. I decided to seperate my layout into 4 main parts: the filter bar, the sort header, the email count, and the emails.

4. *Angular Material Table vs List*

    I first started to work on the email section, but then I realized that the Angular Material Table doesn't have much responsive support. Although the Material Table works great with pagination and applying sorting, I decided to use the Material List with the Material Divider instead. I planned to display the email data using `ngFor` to iterate through emails, and decided to apply a CSS grid structure to each data value. To handle the desktop to mobile view, I displayed the from/to and arrow images as blocks and put them into the grid with a media query.

    > As I worked on the email list section, I had to override some Angular Material styles with the `!important` tag. 
    > This is generally considered bad practice, and I unfortunately had to use more overrides for the filter bar and sort header.

### Addition - Search Bar

I first attempted to use css transforms to move the search bar under the calendar on mobile and to the side on desktop, but I had some issues with positioning and decided to use the max-width transition instead.

### Addition - Email Dropdown


### Addition - Using Custom Date Inputs

When I converted the date format in the calender range input, I used this to format the date correctly in `app.module.ts`.
```typescript
import {MAT_DATE_LOCALE} from '@angular/material/core';
...
providers: [
  ...
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
  ],
```

This overrides Japanese as the default language for the Date values in that specific scope. Although this could be confusing for users who use the English date format, I thought it could add a nice touch if most of the audience is used to the Japanese date format. 

If we did not want the date formating to be in Japanese, we could use MatDateFormats and NativeDateAdapter to format the date to YYYY/MM/DD and keep the local format. This is a good article explaining that process: https://medium.com/@amandeepkochhar/angular-material-datepicker-set-custom-date-in-dd-mm-yyyy-format-5c0f4340e57
