import React from 'react';
import { Page, Text, View, Document, StyleSheet, Link, Font } from '@react-pdf/renderer';

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
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 13,
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.3,
    color: '#000',
  },
  header: {
    fontSize: 24,
    marginBottom: 5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contactInfo: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  email: {
    fontSize: 12,
    marginBottom: 15,
    textAlign: 'center',
    color: '#007acc',
    textDecoration: 'underline',
  },
  separator: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007acc',
    textTransform: 'uppercase',
  },
  subHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 3,
  },
  link: {
    color: '#007acc',
    textDecoration: 'underline',
  },
  column: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftColumn: {
    width: '45%',
    paddingRight: 10,
  },
  rightColumn: {
    width: '55%',
    paddingLeft: 5,
    paddingRight: 10, // Increased paddingRight for more spacing
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
  },
  subheading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Create Document Component
const ResumeDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{data.full_name}</Text>
      <Text style={styles.contactInfo}>{data.contact_info} | {data.email_user}</Text>
      <View style={styles.separator} />

      <View style={styles.column}>
        <View style={styles.leftColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.educations.filter(edu => edu.display).map((edu, index) => (
              <View key={index}>
                <Text style={styles.subHeader}>{edu.school_name}</Text>
                <Text style={styles.text}>{edu.degree}</Text>
                <Text style={styles.text}>{edu.start_date} - {edu.end_date || 'Present'}</Text>
                <Text style={styles.text}>{edu.address}</Text>
                {edu.marks && <Text style={styles.text}>{edu.marks}</Text>}
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Links</Text>
            {data.important_links.filter(link => link.display).map((link, index) => (
              <Text key={index} style={styles.text}>
                <Link src={link.url} style={styles.link}>
                  {link.link_name}
                </Link>
              </Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Coursework</Text>
            {data.courseworks.filter(course => course.display).map((course, index) => (
              <Text key={index} style={styles.text}>{course.title}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.filter(skill => skill.display).map((skill, index) => (
              <Text key={index} style={styles.text}>{skill.name}</Text>
            ))}
          </View>
        </View>

        <View style={styles.rightColumn}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.filter(project => project.display).map((project, index) => (
              <View key={index}>
                <Text style={styles.subHeader}>{project.name}</Text>
                <Text style={styles.text}>{project.description}</Text>
                {project.bullet_points.filter(point => point.display).map((bullet, idx) => (
                  <View key={idx} style={styles.bulletPoint}>
                    <Text style={styles.bulletPointText}>- {bullet.point}</Text>
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
        </View>
      </View>
    </Page>
  </Document>
);

export default ResumeDocument;
