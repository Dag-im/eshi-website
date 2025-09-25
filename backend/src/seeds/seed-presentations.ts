import mongoose from 'mongoose';
import { config } from '../lib/config';

// Define Presentation schema
const presentationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const PresentationModel = mongoose.model('Presentation', presentationSchema);

// Presentation data
const presentations = [
  {
    title: 'Women\'s Business, Empowerment, and the "Self-Help Approach"',
    description:
      'Consortium of Self-Help Group Approach Promoters and The New School, June 23, 2023, Addis Ababa, Ethiopia',
  },
  {
    title:
      'From Here to There: Can Evaluation Localization Lead to Decolonized Funding and Greater Social Impact?',
    description: 'American Evaluation Association annual conference, New Orleans, Nov. 12, 2022',
  },
  {
    title: 'De-colonizing M&E By Rejecting External Evaluation and Building Internal Capacity',
    description:
      'April 25, 2022, Eastern Evaluation Research Society Annual Conference, New Jersey, U.S.',
  },
  {
    title: 'Complexity and Context: Customizing Stakeholder Work in Ethiopia, Kenya and Guatemala',
    description: 'May 6, 2019, Eastern Evaluation Research Society Annual Conference',
  },
  {
    title:
      "(Not) Localizing International Evaluation: Why Aren't More Small National NGOs Doing Monitoring and Evaluation?",
    description:
      'May 1, 2018, Eastern Evaluation Research Society Annual Conference, New Jersey, U.S.',
  },
  {
    title:
      'Capacity-building workshops in Monitoring and Evaluation and Data Collection Design with Ethiopian non-profits',
    description: 'Addis Ababa, 2015 and 2016',
  },
  {
    title: 'Refugees, Immigrants, CBOs and Universities',
    description: 'International Rescue Committee annual conference, April 2007, Washington, D.C.',
  },
  {
    title: 'The Practice and Profession of Monitoring and Evaluation',
    description:
      'June 20, 2022, Addis Ababa University, Sociology Department, Addis Ababa, Ethiopia',
  },
  {
    title: 'The Role of Humanitarian Aid in Human Rights and U.S. Foreign Policy',
    description:
      'March 16, 2022, School of Politics and Global Studies, Arizona State University, Phoenix, Arizona, U.S.',
  },
  {
    title:
      'The International Aid and Development Landscape, and the Complicated Issues in Working Within It',
    description: 'NYU Dental Leaders in Global Public Health, March 6, 2020, New York, U.S.',
  },
  {
    title: 'Nation Building and the War in Yugoslavia',
    description:
      'March 19, 2019; and "Humanitarian Crisis and International Intervention" lectures in Global Studies 341, Prof. Victor Peskin, Arizona State University, March 21, 2016',
  },
  {
    title: 'International Aid and Development, Its Ineffectiveness, and How We Can Improve It',
    description: 'June 2, 2018, Yom Institute of Economic Development, Addis Ababa, Ethiopia',
  },
  {
    title: 'Data Collection Methods for Monitoring and Evaluation',
    description: 'Yom Institute of Economic Development, Addis Ababa, June, 2016',
  },
  {
    title: 'Project Cycle Management',
    description: 'Yom Institute of Economic Development, Addis Ababa, June, 2015',
  },
  {
    title: 'Writing for Human Rights course',
    description: 'Taught at Addis Ababa University Human Rights Center, 2015 and 2016',
  },
  {
    title: 'Monitoring and Evaluation capacity-building workshops with Ethiopian non-profits',
    description: '2016 and 2018',
  },
  {
    title: 'International Evaluation: Decolonized? Disrupted? Status Quo?',
    description: 'March 16, 2022, New York Consortium of Evaluators',
  },
];

async function seed() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log('DB connected');

    // Clear existing data
    await PresentationModel.deleteMany({});

    // Insert directly (Mongo will assign ObjectIds automatically)
    await PresentationModel.insertMany(presentations);

    console.log('Presentations seeded successfully:', presentations.length);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
