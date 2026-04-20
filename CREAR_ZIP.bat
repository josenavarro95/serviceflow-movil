@echo off
REM =====================================================================
REM  Crear ZIP para Ionic AppFlow (usando Python)
REM =====================================================================

setlocal enabledelayedexpansion

echo.
echo Creando archivo ZIP para Ionic AppFlow...
echo.

REM Obtener rutas absolutas
set "CURRENT_DIR=%cd%"
set "ZIP_PATH=D:\INSTALADORES SERVICEFLOW\PRAIA-ionic-appflow.zip"
set "PYTHON_HELPER=D:\INSTALADORES SERVICEFLOW\crear_zip_helper.py"

REM Eliminar ZIP anterior si existe
if exist "%ZIP_PATH%" (
    echo Eliminando ZIP anterior...
    del /q "%ZIP_PATH%"
)

REM Ejecutar script Python helper
python "%PYTHON_HELPER%" "%CURRENT_DIR%" "%ZIP_PATH%"

REM Verificar resultado
if exist "%ZIP_PATH%" (
    echo.
    echo ╔═══════════════════════════════════════════════════════════════╗
    echo ║                    ✅ ZIP CREADO EXITOSAMENTE                ║
    echo ╚═══════════════════════════════════════════════════════════════╝
    echo.
    echo 📦 Archivo ZIP creado en:
    echo    %ZIP_PATH%
    echo.
    echo 🚀 PROXIMOS PASOS:
    echo    1. Ve a: https://ionicframework.com/appflow
    echo    2. Presiona: "New App"
    echo    3. Selecciona: "Import from ZIP"
    echo    4. Sube el archivo: PRAIA-ionic-appflow.zip
    echo    5. Presiona: "Create"
    echo    6. Espera a que compile (5-10 minutos)
    echo    7. Descarga APK e IPA
    echo.
    echo ✅ ¡Listo para subir a Ionic AppFlow!
    echo.
) else (
    echo.
    echo ❌ ERROR: No se pudo crear el ZIP
    echo.
    echo Asegúrate de que:
    echo   1. Python está instalado
    echo   2. La carpeta PRAIA_IONIC contiene archivos
    echo   3. Tienes permisos de escritura
    echo.
)

pause

