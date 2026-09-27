# MTA MetroCard System (Frontend)

A React single-page app for the MTA MetroCard system: issue cards, add balance, check balance, and simulate turnstile swipes with a MetroCard or a debit/credit card. It also shows the most recent cards and payments.

It talks to the Flask/PostgreSQL API in [MTA_Backend](https://github.com/pemba007/MTA_Backend). Built for a graduate Database Systems course.

## Features

- **Issue MetroCard:** limited (with initial balance) or unlimited
- **Add balance / check balance** by card number
- **Swipe:** MetroCard fare deduction, or a debit/credit tap
- **Live tables** of the latest issued cards and payments, refreshed after every action

## Tech

React 17 (hooks) · Axios · react-hook-form · react-modal · Create React App

## Running locally

```bash
yarn install
# point the app at your backend in src/constants.js (HOST_LINK)
yarn start
```
