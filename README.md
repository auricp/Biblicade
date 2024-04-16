# Biblicade

### Course Information
CPSC 471 Winter 2024

Project Name: **Biblicade App**
### Group Members:

- Adubofour-Poku, Auric
    
    - UCID: 30143774 
    
    - Tutorial Number: T04
- Rodriguez, Gabriel
    
    - UCID: 30162544 
    
    - Tutorial Number: T05
- Tran, Angeline 
    
    - UCID: 30139846 
    
    - Tutorial Number: T04

    


# Setting Up Biblicade Project


1. To get started, make sure you have Git (`git --version`) and Node.js (`node -v` and `npm -v`) installed on your computer.

2. Clone the Biblicade repository from Github:
   ```bash
   git clone https://github.com/ajkami/471-Project.git
    ```

3. Navigate into the project directory using `cd 471-Project` (assuming the directory is named 471-Project).

4. Run the command `npm install` at my-app (`cd my-app/`) folder to install the project's dependencies. 

5. Set up the Biblicade database:

    a. To view our databases, please import our `.sql` files stored in the Server folder into a new schema in your mySQL Workbench Application.

    b. As per instructions in `Server/help.txt` in our Github repository:
	
        The database files are to be used in mySQL workbench using the import setting after setting up your workspace. You should import this database by:

            1. Go to your local instance in the workbench

            2. Click on the 'Server' option at the top

            3. From the dropdown menu click 'Data Import'

            4. From this choose the location of the database file on your machine

            5. Click the 'Import Progress' tab and click 'Start Import'


6. Run the command `node index.js` at the Server folder (`cd Server/`) to run the development server.
7. Run `npm start` at my-app folder to run the app.
8. You can now access Biblicade in your web browser by going to `localhost:3000`.
