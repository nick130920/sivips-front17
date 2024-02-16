@echo off
setlocal enabledelayedexpansion

rem Set default values
set "current_project_name=usco-template"
set "current_git_provider=github.com/Coaxus-ux"
set "current_git_username=Coaxus-ux"

rem Function to find files recursively
:find_files
for /f "delims=" %%F in ('findstr /s /m /i /v /c:".git" /c:".angular" /c:"node_modules" /c:"dist" "%current_project_name%" *.*) do (
    echo %%F
)
exit /b

rem Function to prompt for new project name
:prompt_project_name
set /p "project_name=▶ Enter new project name: [current: %current_project_name%] "
set "project_name=!project_name:%current_project_name%=%current_project_name%!"
echo !project_name!
exit /b

rem Function to prompt for Git provider
:prompt_git_provider
set /p "git_provider=▶ Enter Git provider: [current: %current_git_provider%] "
set "git_provider=!git_provider:%current_git_provider%=%current_git_provider%!"
echo !git_provider!
exit /b

rem Function to prompt for Git username
:prompt_git_username
set /p "git_username=▶ Enter Git username: [current: %current_git_username%] "
set "git_username=!git_username:%current_git_username%=%current_git_username%!"
echo !git_username!
exit /b

rem Function to prompt for confirmation (Default: n)
:prompt_confirmation
if "%project_name%"=="%current_project_name%" if "%git_provider%"=="%current_git_provider%" if "%git_username%"=="%current_git_username%" (
    echo The parameters remained unchanged. No renaming and text replacement required.
    exit /b
)

echo You are about to rename the project with the following parameters:
echo Project name: %project_name%
echo Git provider: %git_provider%
echo Git username: %git_username%
set /p "confirm=▶ Are you sure you want to continue? (y/n): [n] "
set "confirm=%confirm:n=N%"
echo %confirm%
exit /b

rem Function to process files
:process_files
for /f "delims=" %%F in ('findstr /s /m /i /v /c:".git" /c:".angular" /c:"node_modules" /c:"dist" "%current_project_name%" *.*) do (
    (
    for /f "delims=" %%L in ('type "%%F" ^& break ^> "%%F" ') do (
        set "line=%%L"
        set "line=!line:%current_git_provider%=%git_provider%!"
        set "line=!line:%current_git_username%=%git_username%!"
        set "line=!line:%current_project_name%=%project_name%!"
        echo !line!
    )) > "temp.tmp" && move /y "temp.tmp" "%%F"
)
echo.
echo ✅ Project renamed to %project_name%
echo ✅ Git provider: %git_provider%
echo ✅ Git username: %git_username%
exit /b

rem Main script logic

rem Display files found
echo Results found for %current_project_name%
call :find_files

echo.

rem Prompt for new project name
call :prompt_project_name

rem Prompt for Git provider
call :prompt_git_provider

rem Prompt for Git username
call :prompt_git_username

rem Prompt for confirmation
call :prompt_confirmation

rem Process files if confirmed
if /i "%confirm%"=="y" call :process_files

echo ❌ Renaming and text replacement canceled.
