import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register fonts
import FontRegular from '../assets/fonts/Roboto-Regular.ttf';
import FontBold from '../assets/fonts/Roboto-Bold.ttf';

// Register fonts
Font.register({
  family: 'Roboto',
  fonts: [
    { src: FontRegular, fontWeight: 'normal' },
    { src: FontBold, fontWeight: 'bold' },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 20,
    fontSize: 12,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '30%',
    paddingRight: 15,
  },
  rightColumn: {
    width: '60%',
    paddingLeft: 20
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    borderBottom: '2px solid #000',
    paddingBottom: 5,
    marginBottom: 10,
  },
  project: {
    marginBottom: 10,
  },
  education: {
    marginBottom: 10,
  },
  skill: {
    marginBottom: 5,
  },
  bulletPoints: {
    marginLeft: 20,
  },
  listItem: {
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#555',
  },
  link: {
    color: '#0000FF',
    textDecoration: 'none',
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  paragraph: {
    marginBottom: 10,
  },
});

// Replace the existing Resume component with a @react-pdf/renderer compatible one
const ResumePDFTemplate2 = ({ data }) => {
  const {
    full_name,
    contact_info,
    email_user,
    educations,
    skills,
    projects,
    display_contact_info,
    important_links,
    courseworks,
    custom_fields,
  } = data;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Left Column */}
        <View style={styles.leftColumn}>
          {/* Header */}
          <View style={styles.header}>
            <Text>{full_name}</Text>
            {display_contact_info && (
              <Text style={styles.contactInfo}>{contact_info} | {email_user}</Text>
            )}
          </View>

          {/* Skills Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Skills</Text>
            {skills.filter(skill => skill.display).map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill.name}</Text>
            ))}
          </View>

          {/* Links Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Links</Text>
            {important_links.filter(link => link.display).map((link, index) => (
              <Text key={index} style={styles.text}>
                <Link src={link.url} style={styles.link}>
                  {link.link_name}
                </Link>
              </Text>
            ))}
          </View>

          {/* Coursework Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Coursework</Text>
            {courseworks.filter(course => course.display).map((course, index) => (
              <Text key={index} style={styles.text}>{course.title}</Text>
            ))}
          </View>
        </View>

        {/* Right Column */}
        <View style={styles.rightColumn}>
          {/* Education Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Education</Text>
            {educations.filter(education => education.display).map(education => (
              <View style={styles.education} key={education.school_name}>
                <Text>{education.degree}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>{education.school_name}</Text> | {education.start_date} - {education.end_date} | {education.address}</Text>
              </View>
            ))}
          </View>
          {/* Projects Section */}
          <View style={styles.section}>
            <Text style={styles.title}>Projects</Text>
            {projects.filter(project => project.display).map(project => (
              <View style={styles.project} key={project.name}>
                <Text>{project.name}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>{project.description}</Text></Text>
                <View style={styles.bulletPoints}>
                  {project.bullet_points.filter(point => point.display).map((point, index) => (
                    <Text style={styles.listItem} key={index}>{point.point}</Text>
                  ))}
                </View>
              </View>
            ))}
          </View>

          {/* Custom Fields Section */}
          {custom_fields && custom_fields.filter(field => field.display).map(field => (
            <View key={field.heading} style={styles.section}>
              <Text style={styles.title}>{field.heading}</Text>
              <Text style={styles.paragraph}>{field.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDFTemplate2;
