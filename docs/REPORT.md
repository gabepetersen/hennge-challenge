# Report

This document is an explination of my process in creating this component. The sections at the end clarify some of my additions to this project.

### Process

1. Deciding the Framework
    
    I decided to use Angular since I have been using it recently and I am familiar with the Angular Material library.

    > I'll have to admit one of my pretty silly mistakes: I thought I saw Angular on your guys' tech stack for some reason, and I thought "oh perfect". I realize now that React with a library like Ant Design might have been a good alternative for this project.

    Angul

2. Sorting out Themes

3. Creating Layout

4. Angular Material Table vs List

5. 


### Search Bar

I first attempted to use css transforms to move the search bar under the calendar on mobile and to the side on desktop, but I had some issues with positioning and decided to use the max-width transition instead.

### Email Dropdown


### Using Custom Date Inputs

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