# proj3339
CS3339 Disassembler

- [Project Requirments](https://git.txstate.edu/sts100/proj3339/blob/master/files/project_description.pdf)
- [Project Proposal](https://git.txstate.edu/sts100/proj3339/blob/master/files/CS3339-Project-Proposal.pdf)

# super cool disassembler 😎

## Table of Contents
1. [Overview](#Overview)
2. [Demos](#Demos)
3. [Product Spec](#Product-Spec)
4. [Wireframes](#Wireframes)
5. [Schema](#Schema)

## Overview
### Description
Use the Super Cool Disassembler That does Cool Things™ to cheat on your assembly homework! Kidding. I don't condone academic dishonesty.

### App Evaluation
- **Category:** Utility
- **Mobile:** This app would benefit from a web format so that it can be utilized from several different device types, not limited to architecture.
- **Story:** allows users to share their EDC combinations
- **Market:** Those who are interested in creating a program similar to one they already have.
- **Scope:** centralize one portable tool for translating machine code into human-readable format (MIPS instructions) 

## Demos
Drag and drop a txt file into the file field on the left. Don't have a txt file? Convert your object file to txt file using this C++ program. View MIPS instructions on the right. *Note that there currently is no implementation of pseudoinstructions.*

## Product Spec

### 1. User Stories (Required and Optional)

**Project Feature Goals**

- [x] Ability to convert a .bin file to a .txt file
- [x] Ability to use file picker to upload a .txt file as input
- [x] Users can see output

**Optional Nice-to-have Features**
- [ ] add animation for processes that may take a while
- [ ] add transition animation to smooth out abrupt changes

Users can: 
- [ ] download output file
- [ ] click on an instruction type to see more info
- [x] drag and drop a file
- [ ] upload multiple files
- [ ] users can see multiple outputs
- [ ] clear output
- [ ] provide typed machine snippets as input
- [ ] R, I, J, and FR instructions are highlighted different colors
- [ ] hover over disassembled instructions to view their 
  - [ ] type 
  - [ ] instruction format
  - [ ] opcode
- [ ] fix autolayout for mobile 
  - [ ] allow code snippets from mobile

### 2. Screen Archetypes

* Upload
   * To upload txt file
 
* View
   * see output instructions

* Detail view
    * more information on the instruction

### 3. Navigation

**Tab Navigation** (Tab to Screen)

* Profile
    * has username, photo, and description 
* search
    * where user can search for a post
* home
    * shows home feed of global posts 
* saved posts 
    * has list of all saved/liked posts
 
## Wireframes
![Color way](https://git.txstate.edu/sts100/proj3339/blob/master/files/media/color_scheme.PNG)
![Homepage](https://git.txstate.edu/sts100/proj3339/blob/master/files/media/homepage.png)
https://www.figma.com/file/agDKzd86V69z52OuyuFPDq/Disassembler?node-id=0%3A1

## Schema
### Data Models
**Input**

Property | Type | Description | 
|---|---|---|
inputf | blob object | input file | 


## Third Party

[colormind](http://colormind.io/)
<div><a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

## **Assets**
<div><a href="https://www.flaticon.com/authors/bqlqn" title="Colormind"></div>
<div>Icons made by <a href="https://www.flaticon.com/authors/bqlqn" title="bqlqn">bqlqn</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
