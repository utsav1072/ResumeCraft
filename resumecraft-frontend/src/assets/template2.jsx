import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';

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
    color: '#444',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5D5D5D',
  },
  project: {
    marginBottom: 15,
  },
  education: {
    marginBottom: 15,
  },
  skill: {
    marginBottom: 5,
    color: '#007BFF',
  },
  listItem: {
    marginBottom: 5,
    color: '#555',
  },
  contactInfo: {
    fontSize: 10,
    color: '#777',
  },
  link: {
    color: '#007BFF',
  },
  text: {
    fontSize: 11,
  },
});

// Replace the existing Resume component with a @react-pdf/renderer compatible one
const ResumePDF = ({ data }) => {
  const {
    full_name,
    contact_info,
    email_user,
    educations,
    skills,
    projects,
    display_contact_info,
  } = data;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text>{full_name}</Text>
          {display_contact_info && (
            <View>
              <Text style={styles.contactInfo}>
                {contact_info} | {email_user}
              </Text>
            </View>
          )}
        </View>

        {/* Projects Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {projects.map(project => project.display && (
            <View style={styles.project} key={project.name}>
              <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
              <Text>{project.description}</Text>
              <View style={styles.bulletPoints}>
                {project.bullet_points.map((point, index) => point.display && (
                  <Text style={styles.listItem} key={index}>{point.point}</Text>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Education Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Education</Text>
          {educations.map(education => education.display && (
            <View style={styles.education} key={education.school_name}>
              <Text style={{ fontWeight: 'bold' }}>{education.school_name}</Text>
              <Text>{education.degree} | {education.start_date} - {education.end_date} | {education.address}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Skills</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {skills.map(skill => skill.display && (
              <Text key={skill.name} style={[styles.text, styles.skill]}>{skill.name}</Text>
            ))}
          </View>
        </View>

        {/* Custom Fields Section */}
        {data.custom_fields && data.custom_fields.map(field => field.display && (
          <View key={field.heading} style={styles.section}>
            <Text style={styles.title}>{field.heading}</Text>
            <Text style={styles.text}>{field.description}</Text>
          </View>
        ))}

        {/* Links Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Links</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {data.important_links.filter(link => link.display).map((link, index) => (
              <Text key={index} style={styles.text}>
                <Link src={link.url} style={styles.link}>
                  {link.link_name}
                </Link>
                {index < data.important_links.filter(link => link.display).length - 1 && ', '}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
