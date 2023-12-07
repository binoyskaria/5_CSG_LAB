const Image = require('../models/Image');
const FacultyImage = require('../models/FacultyImage');
const Publication = require('../models/Publication');
const Project = require('../models/Project');
const fs = require('fs').promises;
const multer = require('multer');


// Function to handle image upload
const handleImageUpload = async (req, res) => {
  try {
    // Multer configuration for file upload
    const storage = multer.diskStorage({
      destination: './uploads/students/',
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 10000000 }, // 10MB limit
    }).single('image');

    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ error: 'Error uploading image' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { title, description } = req.body;

      console.log('Image upload details:', {
        imageUrl: req.file.filename,
        title: title,
        description: description,
      });

      const newImage = new Image({
        imageUrl: req.file.filename,
        title: title,
        description: description,
      });

      console.log('New Image Object:', newImage);

      const savedImage = await newImage.save();

      // Append new image data to imageData.csv
      const imageDataCsvPath = './data/imageData.csv';
      const imageDataCsvRow = `${savedImage.imageUrl}#${savedImage.title}#${savedImage.description}\n`;

      await fs.appendFile(imageDataCsvPath, imageDataCsvRow);

      console.log('Image data appended to CSV:', {
        imageUrl: savedImage.imageUrl,
        title: savedImage.title,
        description: savedImage.description,
      });

      res.json({
        message: 'Image uploaded successfully',
        imageUrl: savedImage.imageUrl,
        title: savedImage.title, 
        description: savedImage.description,
      });
    });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Function to handle image upload
const handleFacultyUpload = async (req, res) => {
  try {
    // Multer configuration for file upload
    const storage = multer.diskStorage({
      destination: './uploads/faculty/',
      filename: function (req, file, cb) {
        cb(null, file.originalname);
      },
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 10000000 }, // 10MB limit
    }).single('image');

    upload(req, res, async (err) => {
      if (err) {
        console.error('Error uploading image:', err);
        return res.status(500).json({ error: 'Error uploading image' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { title, description } = req.body;

      console.log('Image upload details:', {
        imageUrl: req.file.filename,
        title: title,
        description: description,
      });

      const newImage = new FacultyImage({
        imageUrl: req.file.filename,
        title: title,
        description: description,
      });

      console.log('New Image Object:', newImage);

      const savedImage = await newImage.save();

      // Append new image data to imageData.csv
      const imageDataCsvPath = './data/facultyData.csv';
      const imageDataCsvRow = `${savedImage.imageUrl}#${savedImage.title}#${savedImage.description}\n`;

      await fs.appendFile(imageDataCsvPath, imageDataCsvRow);

      console.log('Image data appended to CSV:', {
        imageUrl: savedImage.imageUrl,
        title: savedImage.title,
        description: savedImage.description,
      });

      res.json({
        message: 'Image uploaded successfully',
        imageUrl: savedImage.imageUrl,
        title: savedImage.title, 
        description: savedImage.description,
      });
    });
  } catch (error) {
    console.error('Error handling image upload:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






// Function to handle adding a new publication
const handleAddPublication = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    console.log('Publication details:', {
      title: title,
      date: date,
      description: description,
    });

    if (!title || !date || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newPublication = new Publication({
      title,
      date,
      description,
    });

    console.log('New Publication Object:', newPublication);

    const savedPublication = await newPublication.save();

    // Append new publication data to publication.csv
    const publicationCsvPath = './data/publication.csv';
    const publicationCsvRow = `${savedPublication.title}#${savedPublication.date}#${savedPublication.description}\n`;

    await fs.appendFile(publicationCsvPath, publicationCsvRow);

    console.log('Publication data appended to CSV:', {
      title: savedPublication.title,
      date: savedPublication.date,
      description: savedPublication.description,
    });

    res.json({ message: 'Publication added successfully', publication: savedPublication });
  } catch (error) {
    console.error('Error adding publication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



// Function to handle adding a new project
const handleAddProject = async (req, res) => {
  try {
    const { title, faculty, companyfund, date, summary } = req.body;

    console.log('Project details:', {
      title: title,
      faculty: faculty,
      companyfund: companyfund,
      date: date,
      summary: summary,
    });

    if (!title || !faculty || !companyfund || !date || !summary) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newProject = new Project({
      title,
      faculty,
      companyfund,
      date,
      summary,
    });

    console.log('New Project Object:', newProject);

    const savedProject = await newProject.save();

    // Append new project data to projects.csv
    const projectsCsvPath = './data/projectData.csv';
    const projectCsvRow = `${savedProject.title}#${savedProject.faculty}#${savedProject.companyfund}#${savedProject.date}#${savedProject.summary}\n`;

    await fs.appendFile(projectsCsvPath, projectCsvRow);

    console.log('Project data appended to CSV:', {
      title: savedProject.title,
      faculty: savedProject.faculty,
      companyfund: savedProject.companyfund,
      date: savedProject.date,
      summary: savedProject.summary,
    });

    res.json({ message: 'Project added successfully', project: savedProject });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { handleImageUpload,handleFacultyUpload, handleAddPublication, handleAddProject };
