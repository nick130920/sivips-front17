#!/bin/bash

current_project_name="usco-template"
current_git_provider="github.com/coaxus-ux"
current_git_username="coaxus-ux"

# Function to find files recursively
find_files() {
    local files
    files=$(grep -rl --exclude-dir={.git,.angular,node_modules,dist} "$current_project_name" .)
    echo "$files"
}

# Function to prompt for new project name
prompt_project_name() {
    read -rp "▶ Ingrese el nuevo nombre: [Actual: $current_project_name] " project_name
    project_name=${project_name:-"$current_project_name"}
    echo "$project_name"
}

# Function to prompt for Git provider
prompt_git_provider() {
    read -rp "▶ Ingrese Git provider: [Actual: $current_git_provider] " git_provider
    git_provider=${git_provider:-"$current_git_provider"}
    echo "$git_provider"
}

# Function to prompt for Git username
prompt_git_username() {
    read -rp "▶ Ingrese Git username: [Actual: $current_git_username] " git_username
    git_username=${git_username:-"$current_git_username"}
    echo "$git_username"
}

# Function to prompt for confirmation (Default: n)
prompt_confirmation() {
    local project_name=$1
    local git_provider=$2
    local git_username=$3

    if [[ "$project_name" == "$current_project_name" && "$git_provider" == "$current_git_provider" && "$git_username" == "$current_git_username" ]]; then
        echo "Los parámetros no se han modificado. No es necesario cambiar el nombre ni sustituir el texto." >/dev/tty
        exit 0
    fi

    echo "Va a renombrar el proyecto con los siguientes parámetros:" >/dev/tty
    echo "Nombre del proyecto:" "$project_name" >/dev/tty
    echo "Git provider:" "$git_provider" >/dev/tty
    echo "Git username:" "$git_username" >/dev/tty
    read -rp "▶ ¿Seguro que quieres continuar? (y/n): [n] " confirm
    confirm=${confirm:-n}
    echo "$confirm"
}

# Function to process files
process_files() {
    local files=$1
    local project_name=$2
    local git_provider=$3
    local git_username=$4

    for file in $files; do
        sed -i \
            -e "s|$current_git_provider|$git_provider|g" \
            -e "s|$current_git_username|$git_username|g" \
            -e "s|$current_project_name|$project_name|g" \
            "$file"
    done

    echo
    echo "✅ El proyecto ha pasado a llamarse $project_name"
    echo "✅ Git provider: $git_provider"
    echo "✅ Git username: $git_username"
}

# Main script logic
files=$(find_files)

# Display files found
echo "Resultados encontrados para $current_project_name"
echo "$files"
echo

project_name=$(prompt_project_name)
git_provider=$(prompt_git_provider)
git_username=$(prompt_git_username)

confirm=$(prompt_confirmation "$project_name" "$git_provider" "$git_username")

# Process files if confirmed
if [ "$confirm" == "y" ] || [ "$confirm" == "Y" ]; then
    process_files "$files" "$project_name" "$git_provider" "$git_username"
else
    echo "❌ Cambio de nombre y sustitución de texto cancelados."
fi