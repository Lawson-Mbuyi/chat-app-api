import express from "express";

export const AuthFilter = (req, res, next) => {
  if (!req.user) {
    redirect("home");
  } else {
    next();
  }
};