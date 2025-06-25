@echo off
REM =========================================================
REM LocalBarTees Warehouse Portal - Folder Structure Creator
REM =========================================================

echo.
echo ======================================================
echo     LocalBarTees B2B Warehouse Portal Setup
echo ======================================================
echo.

REM Check if warehouse folder already exists
if exist "warehouse" (
    echo WARNING: warehouse folder already exists!
    echo Do you want to continue? This will create additional folders.
    pause
)

echo Creating main warehouse structure...

REM Create main directories
mkdir "warehouse" 2>nul
cd warehouse

REM Create shared resources
echo Creating shared resources...
mkdir "shared-resources"
mkdir "shared-resources\templates"
mkdir "shared-resources\product-catalog"
mkdir "shared-resources\product-catalog\size-charts"
mkdir "shared-resources\product-catalog\color-options"
mkdir "shared-resources\policies"
mkdir "shared-resources\tutorials"
mkdir "shared-resources\company-info"
mkdir "shared-resources\company-info\company-updates"

REM Create admin office
echo Creating admin office...
mkdir "admin-office"
mkdir "admin-office\client-management"
mkdir "admin-office\client-management\onboarding-checklists"
mkdir "admin-office\client-management\account-status-reports"
mkdir "admin-office\client-management\client-communication-logs"
mkdir "admin-office\operations"
mkdir "admin-office\operations\production-schedules"
mkdir "admin-office\operations\inventory-management"
mkdir "admin-office\operations\supplier-information"
mkdir "admin-office\operations\quality-control-processes"
mkdir "admin-office\financial"
mkdir "admin-office\financial\client-billing"
mkdir "admin-office\financial\profit-analysis"
mkdir "admin-office\financial\accounts-receivable"
mkdir "admin-office\financial\financial-reports"
mkdir "admin-office\system-admin"
mkdir "admin-office\system-admin\user-permissions"
mkdir "admin-office\system-admin\backup-procedures"
mkdir "admin-office\system-admin\security-protocols"
mkdir "admin-office\system-admin\system-updates"

echo.
echo ======================================================
echo     CLIENT SETUP
echo ======================================================
echo.
echo This will create individual warehouse spaces for each client.
echo You can run this script multiple times to add new clients.
echo.

REM Prompt for client name
:client_loop
set /p client_name="Enter client name (or 'done' to finish): "

if /i "%client_name%"=="done" goto :finish
if "%client_name%"=="" goto :client_loop

REM Convert to folder-safe name (basic cleanup)
set folder_name=%client_name: =-%
set folder_name=%folder_name:'=%
set folder_name=%folder_name:&=%

echo Creating warehouse for: %client_name% (folder: %folder_name%)

REM Create client main folder
mkdir "%folder_name%"
cd "%folder_name%"

REM Loading Dock (Dashboard)
echo   - Creating loading dock...
mkdir "loading-dock"
mkdir "loading-dock\recent-activity"
mkdir "loading-dock\quick-actions"
mkdir "loading-dock\alerts"
mkdir "loading-dock\at-a-glance"

REM Receiving (Onboarding)
echo   - Creating receiving area...
mkdir "receiving"
mkdir "receiving\welcome-packet"
mkdir "receiving\setup-forms"
mkdir "receiving\brand-assets-upload"
mkdir "receiving\brand-assets-upload\logo-files"
mkdir "receiving\brand-assets-upload\photos"
mkdir "receiving\brand-assets-upload\brand-guidelines"
mkdir "receiving\brand-assets-upload\inspiration"
mkdir "receiving\onboarding-status"

REM Inventory (Products)
echo   - Creating inventory...
mkdir "inventory"
mkdir "inventory\current-catalog"
mkdir "inventory\current-catalog\design-specifications"
mkdir "inventory\artwork-files"
mkdir "inventory\artwork-files\print-ready"
mkdir "inventory\artwork-files\print-ready\color-variations"
mkdir "inventory\artwork-files\mockups"
mkdir "inventory\artwork-files\mockups\lifestyle-photos"
mkdir "inventory\artwork-files\source-files"
mkdir "inventory\product-performance"
mkdir "inventory\custom-requests"
mkdir "inventory\custom-requests\pending-designs"
mkdir "inventory\custom-requests\approved-concepts"
mkdir "inventory\custom-requests\revision-history"
mkdir "inventory\discontinued"
mkdir "inventory\discontinued\archived-designs"

REM Shipping (Orders)
echo   - Creating shipping area...
mkdir "shipping"
mkdir "shipping\active-orders"
mkdir "shipping\order-history"
mkdir "shipping\order-history\2024-orders"
mkdir "shipping\order-history\2025-q1-orders"
mkdir "shipping\order-history\order-summary-reports"
mkdir "shipping\shipping-preferences"
mkdir "shipping\order-templates"
mkdir "shipping\returns"
mkdir "shipping\returns\return-requests"
mkdir "shipping\returns\replacement-orders"

REM Quality Control (Brand Standards)
echo   - Creating quality control...
mkdir "quality-control"
mkdir "quality-control\brand-guidelines"
mkdir "quality-control\approval-workflow"
mkdir "quality-control\approval-workflow\pending-approvals"
mkdir "quality-control\approval-workflow\approved-designs"
mkdir "quality-control\approval-workflow\revision-requests"
mkdir "quality-control\approval-workflow\approval-history"
mkdir "quality-control\quality-standards"
mkdir "quality-control\compliance"

REM Office (Business Documents)
echo   - Creating office...
mkdir "office"
mkdir "office\contracts"
mkdir "office\contracts\amendments"
mkdir "office\contracts\renewal-documents"
mkdir "office\financial"
mkdir "office\financial\invoices"
mkdir "office\financial\invoices\2024-invoices"
mkdir "office\financial\invoices\2025-invoices"
mkdir "office\financial\statements"
mkdir "office\financial\tax-documents"
mkdir "office\communication"
mkdir "office\communication\meeting-notes"
mkdir "office\communication\email-correspondence"
mkdir "office\communication\project-updates"
mkdir "office\communication\announcements"
mkdir "office\reports"
mkdir "office\reports\custom-reports"
mkdir "office\support"
mkdir "office\support\support-tickets"
mkdir "office\support\how-to-guides"
mkdir "office\support\video-tutorials"

REM Create some initial placeholder files
echo   - Creating initial files...

REM Loading dock welcome message
echo Welcome to %client_name%'s Warehouse Portal! > "loading-dock\welcome-message.md"
echo ============================================== >> "loading-dock\welcome-message.md"
echo. >> "loading-dock\welcome-message.md"
echo This is your dedicated space for managing all things related to your LocalBarTees partnership. >> "loading-dock\welcome-message.md"
echo. >> "loading-dock\welcome-message.md"
echo Navigate through the different areas: >> "loading-dock\welcome-message.md"
echo - **Receiving**: Onboarding and setup >> "loading-dock\welcome-message.md"
echo - **Inventory**: Your products and designs >> "loading-dock\welcome-message.md"
echo - **Shipping**: Orders and delivery tracking >> "loading-dock\welcome-message.md"
echo - **Quality Control**: Brand standards and approvals >> "loading-dock\welcome-message.md"
echo - **Office**: Business documents and communication >> "loading-dock\welcome-message.md"
echo. >> "loading-dock\welcome-message.md"
echo Your account manager: [TO BE ASSIGNED] >> "loading-dock\welcome-message.md"

REM Onboarding checklist
echo %client_name% Onboarding Checklist > "receiving\onboarding-status\next-actions.md"
echo ================================== >> "receiving\onboarding-status\next-actions.md"
echo. >> "receiving\onboarding-status\next-actions.md"
echo [ ] Complete brand information form >> "receiving\onboarding-status\next-actions.md"
echo [ ] Upload logo files >> "receiving\onboarding-status\next-actions.md"
echo [ ] Provide venue photos >> "receiving\onboarding-status\next-actions.md"
echo [ ] Review and sign partnership agreement >> "receiving\onboarding-status\next-actions.md"
echo [ ] Set up payment information >> "receiving\onboarding-status\next-actions.md"
echo [ ] First design concepts >> "receiving\onboarding-status\next-actions.md"
echo [ ] Approve initial designs >> "receiving\onboarding-status\next-actions.md"
echo [ ] Place first order >> "receiving\onboarding-status\next-actions.md"

REM Basic contact info
echo %client_name% Contact Information > "office\communication\contact-info.md"
echo ============================== >> "office\communication\contact-info.md"
echo. >> "office\communication\contact-info.md"
echo **Primary Contact**: [TO BE FILLED] >> "office\communication\contact-info.md"
echo **Phone**: [TO BE FILLED] >> "office\communication\contact-info.md"
echo **Email**: [TO BE FILLED] >> "office\communication\contact-info.md"
echo **Address**: [TO BE FILLED] >> "office\communication\contact-info.md"
echo. >> "office\communication\contact-info.md"
echo **Account Manager**: [TO BE ASSIGNED] >> "office\communication\contact-info.md"
echo **Support Email**: support@localbartees.com >> "office\communication\contact-info.md"

cd ..
echo   ✓ Warehouse created for %client_name%
echo.

goto :client_loop

:finish
echo.
echo ======================================================
echo     SETUP COMPLETE!
echo ======================================================
echo.
echo Your LocalBarTees B2B Warehouse Portal structure has been created.
echo.
echo Main folders created:
echo - warehouse\shared-resources\     (Common files and templates)
echo - warehouse\admin-office\        (Internal management)
echo - warehouse\[client-folders]\    (Individual client warehouses)
echo.
echo Next steps:
echo 1. Populate shared-resources with your templates and policies
echo 2. Set up user permissions for each client folder
echo 3. Customize welcome messages and contact information
echo 4. Add your existing client files to their respective warehouses
echo.
echo Happy organizing!
echo.
pause