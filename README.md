## EssentialCoaching.co.uk

A small business website, designed to provide information, contact details and booking options for Essential Coaching, a small coaching business. Optimised version of Essential Coaching App repository (https://github.com/jwpf100/essential-coaching-app).

- Built with Gatsby 3.0 for React
- Styled using Bootstrap, Emotion and SASS
- Continuous integration with Github Actions
- Storybook is used for visual testing
- Hosted on Amazon S3 with CloudFront

## Project Status

Live.  An updated version of Essential Coaching taking a site I'd developed using Bootstrap, Express, Ejs, and hosted on Heroku and converting it to a static site, hosted on Amazon S3 with the aim of speeding up the experience, and reducing the monthly cost to host.

Currently live at https://www.essentialcoaching.co.uk/.

## Project Screen Shots

<img src="https://user-images.githubusercontent.com/64267174/106137346-7c98a580-6162-11eb-9755-ba2f57bb1844.png" height="500"> <img src="https://user-images.githubusercontent.com/64267174/106137598-d1d4b700-6162-11eb-98c5-a58fd574278e.png" height="500">

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.

Installation:

`npm install`

To Start Gatsby Server:

`npm start`

To Visit App:

`localhost:8000`

## Reflection

A significant upgrade on the original site, despite everything looking pretty similar.  There has been a noticable improvement in performance.  The original site had a lighthouse score in the low 60s, which has been improved to a score of 91, with perfect accessability and SEO scores.  
Changing the site to a component oriented style has made it much easier to style the site consistently, and reusing code made it much quicker to create than the original version.  
The performance score can be improved further and there are various elements that can be optimised in Gatsby 3.0, primarily the images. 
Next actions will be to improve the blog page, possibly by adding a headless CMS to enable the site owner to update content.
