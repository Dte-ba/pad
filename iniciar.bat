@echo off

start make
Ping -n 5 localhost > NUL
start http://localhost:8000
