import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

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

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#333',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
  },
  avatar: {
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 60,
    alignSelf: 'center',
    objectFit: 'cover',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007acc',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#007acc',
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    marginBottom: 3,
    color: '#333',
  },
  link: {
    color: '#007acc',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bulletPointIcon: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#333',
    marginRight: 5,
    marginTop: 1,
  },
  bulletPointText: {
    color: '#333',
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
    color: '#333',
  },
});

// Create Document Component
const ResumeDocument = ({ data, profilePicUrl }) => {
  if (!data) {
    return null; // or show a loading indicator
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {profilePicUrl && (
            <Image
              style={styles.avatar}
              src={`https://utsav10721.pythonanywhere.com${profilePicUrl}`}
              allowDangerousPaths
              fixed
            />
          )}
          <Text style={styles.headerText}>{data.full_name}</Text>
          <Text style={styles.contactInfo}>{data.contact_info}</Text>
          <Text style={styles.contactInfo}>{data.email_user}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.educations && data.educations.filter(edu => edu.display).map((edu, index) => (
            <View key={index}>
              <Text style={styles.subHeader}>{edu.school_name}</Text>
              <Text style={styles.text}>{edu.degree}</Text>
              <Text style={styles.text}>{edu.start_date} - {edu.end_date || 'Present'}</Text>
              <Text style={styles.text}>{edu.address}</Text>
              {edu.marks && <Text style={styles.text}>Marks: {edu.marks}</Text>}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text>{data.skills.map(skill => skill.display && skill.name).join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coursework</Text>
          <Text>{data.courseworks.map(course => course.display && course.title).join(', ')}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects && data.projects.filter(project => project.display).map((project, index) => (
            <View key={index}>
              <Text style={styles.subHeader}>{project.name}</Text>
              <Text style={styles.text}>{project.description}</Text>
              {project.bullet_points && project.bullet_points.filter(point => point.display).map((bullet, idx) => (
                <View key={idx} style={styles.bulletPoint}>
                  <View style={styles.bulletPointIcon} />
                  <Text style={styles.bulletPointText}>{bullet.point}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {data.custom_fields && data.custom_fields.map(field => field.display && (
          <View key={field.heading} style={styles.section}>
            <Text style={styles.subheading}>{field.heading}</Text>
            <Text style={styles.paragraph}>{field.description}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default ResumeDocument;
