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
  },
  header: {
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
              <Text>
              <Text style={styles.contactInfo}>{contact_info} | {email_user}</Text>
              </Text>
            </View>
          )}
        </View>

        {/* Experience Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Projects</Text>
          {projects.map(project => project.display && (
            <View style={styles.project} key={project.name}>
              <Text>{project.name}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>{project.description}</Text></Text>
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
          <Text style={styles.title}>EDUCATION</Text>
          {educations.map(education => education.display && (
            <View style={styles.education} key={education.school_name}>
              <Text>{education.degree}</Text>
              <Text><Text style={{ fontWeight: 'bold' }}>{education.school_name}</Text> | {education.start_date} - {education.end_date} | {education.address}</Text>
            </View>
          ))}
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.title}>SKILLS</Text>
          <Text>{skills.map(skill => skill.display && skill.name).join(',')}</Text>
        </View>

        {/* Add other sections similarly */}
        <view style={styles.section}>
        {data.custom_fields && data.custom_fields.map(field => field.display && (
              <View key={field.heading} style={styles.section}>
                <Text style={styles.title}>{field.heading}</Text>
                <Text style={styles.paragraph}>{field.description}</Text>
              </View>
            ))}
        </view>

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
          <View style={styles.section}>
            <Text style={styles.title}>Coursework</Text>
            {data.courseworks.filter(course => course.display).map((course, index) => (
              <Text key={index} style={styles.text}>{course.title}</Text>
            ))}
          </View>
      </Page>
    </Document>
  );
};

export default ResumePDF;
