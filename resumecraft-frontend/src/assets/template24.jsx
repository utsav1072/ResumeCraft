// Template1.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image, Link } from '@react-pdf/renderer';

// Register fonts
import FontRegular from '../assets/fonts/Roboto-Regular.ttf';
import FontBold from '../assets/fonts/Roboto-Bold.ttf';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: FontRegular, fontWeight: 'normal' },
    { src: FontBold, fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#333',
    flexDirection: 'row',
    height: '100%',
  },
  leftColumn: {
    color: 'white',
    width: '35%',
    backgroundColor: '#ea396d',
    padding: 20,
  },
  rightColumn: {
    width: '65%',
    padding: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    objectFit: 'cover',
  },
  headerText: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 12,
    textDecoration: 'underline',
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    color: '#007acc',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#007acc',
    paddingBottom: 5,
  },
  sectionTitleleft: {
    fontSize: 14,
    marginBottom: 10,
    color: 'black',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#007acc',
    paddingBottom: 5,
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    marginBottom: 3,
    color: '#333',
  },
  link: {
    color: 'black',
    textDecoration: 'underline',
  },
  section: {
    marginBottom: 15,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bulletPointText: {
    marginLeft: 5,
    color: '#333',
  },
  bullet: {
    width: 5,
    height: 5,
    backgroundColor: '#333',
    borderRadius: '50%',
  },
  skillText: {
    marginBottom: 3,
    color: 'white',
  },
});

// Create Document Component
const Template1 = ({ data, profilePicUrl }) => {
  if (!data) {
    return null;
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.leftColumn}>
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
            <Text style={styles.email}>{data.email_user}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitleleft}>Skills</Text>
            {data.skills && data.skills.filter(skill => skill.display).map((skill, index) => (
              <Text key={index} style={styles.skillText}>{skill.name}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitleleft}>Links</Text>
            {data.important_links && data.important_links.filter(link => link.display).map((link, index) => (
              <Text key={index} style={styles.text}>
                <Link src={link.url} style={styles.link}>
                  {link.link_name}
                </Link>
              </Text>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
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
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects && data.projects.filter(project => project.display).map((project, index) => (
              <View key={index}>
                <Text style={styles.subHeader}>{project.name}</Text>
                <Text style={styles.text}>{project.description}</Text>
                {project.bullet_points && project.bullet_points.filter(point => point.display).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <View style={styles.bullet} />
                    <Text style={styles.bulletPointText}>{bullet.point}</Text>
                  </View>
                ))}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coursework</Text>
            {data.courseworks && data.courseworks.filter(course => course.display).map((course, index) => (
              <Text key={index} style={styles.text}>{course.title}</Text>
            ))}
          </View>

          {data.custom_fields && data.custom_fields.map(field => field.display && (
            <View key={field.heading} style={styles.section}>
              <Text style={styles.subHeader}>{field.heading}</Text>
              <Text style={styles.text}>{field.description}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default Template1;
