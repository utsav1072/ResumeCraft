import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

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
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subHeaderText: {
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: '50%',
    marginBottom: 10,
    objectFit: 'cover',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  contact: {
    marginBottom: 10,
  },
  contactText: {
    marginBottom: 3,
  },
  contactLink: {
    color: '#007acc',
    textDecoration: 'underline',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '40%',
    paddingRight: 20,
  },
  rightColumn: {
    width: '55%',
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  bulletPointText: {
    marginLeft: 5,
    flex: 1,
  },
  bulletPointIcon: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#333',
    marginTop: 3,
  },
  paragraph: {
    marginBottom: 5,
  },
  projectContainer: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  projectDescription: {
    marginBottom: 5,
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
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>{data.full_name}</Text>
            <Text style={styles.subHeaderText}>{data.job_title}</Text>
          </View>
          <View style={styles.headerRight}>
            {profilePicUrl && (
              <Image
                style={styles.avatar}
                src={`https://utsav10721.pythonanywhere.com${profilePicUrl}`}
                allowDangerousPaths
                fixed
              />
            )}
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.leftColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact</Text>
              <Text style={styles.contactText}>{data.contact_info}</Text>
              <Text style={styles.contactText}>{data.address}</Text>
              <Text style={styles.contactText}>{data.phone}</Text>
              <Text style={styles.contactLink}>{data.email_user}</Text>
              {data.links && data.links.filter(link => link.display).map((link, index) => (
                <Text key={index} style={styles.contactLink}>{link.name}: {link.url}</Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              {data.skills && data.skills.filter(skill => skill.display).map((skill, index) => (
                <Text key={index} style={styles.paragraph}>{skill.name}</Text>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              {data.languages && data.languages.filter(lang => lang.display).map((lang, index) => (
                <Text key={index} style={styles.paragraph}>{lang.name}</Text>
              ))}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.educations && data.educations.filter(edu => edu.display).map((edu, index) => (
                <View key={index} style={styles.paragraph}>
                  <Text style={styles.subHeaderText}>{edu.school_name}</Text>
                  <Text style={styles.paragraph}>{edu.degree}</Text>
                  <Text style={styles.paragraph}>{edu.start_date} - {edu.end_date}</Text>
                  <Text style={styles.paragraph}>{edu.address}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.rightColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects && data.projects.filter(project => project.display).map((project, index) => (
                <View key={index} style={styles.projectContainer}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                  <Text style={styles.projectDescription}>{project.description}</Text>
                  {project.bullet_points && project.bullet_points.filter(point => point.display).map((bullet, idx) => (
                    <View key={idx} style={styles.bulletPoint}>
                      <View style={styles.bulletPointIcon} />
                      <Text style={styles.bulletPointText}>{bullet.point}</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeDocument;
