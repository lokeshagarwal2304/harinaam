'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'hi' | 'en' | 'te' | 'ta' | 'kn';

export interface Translations {
  appName: string;
  appSubName: string;
  appTagline: string;
  startWriting: string;
  dashboard: string;
  history: string;
  settings: string;
  privacy: string;
  terms: string;
  cookies: string;
  devoteeNameLabel: string;
  devoteeNamePlaceholder: string;
  greetingDevotee: string;
  devoteeBadge: string;
  selectNaamTitle: string;
  selectNaamSubtitle: string;
  step1Of2: string;
  step2Of2: string;
  nextStep: string;
  prevStep: string;
  backToHome: string;
  selectMalaTitle: string;
  selectMalaSubtitle: string;
  selectedNaamBadge: string;
  malaUnit: string;
  naamUnit: string;
  customCount: string;
  startSadhana: string;
  starting: string;
  clearCanvas: string;
  target: string;
  totalNaam: string;
  mala: string;
  writeHere: string;
  offlineBadge: string;
  malaCompletedTitle: string;
  malaCompletedDesc: string;
  malaMantra: string;
  nextMalaButton: string;
  viewDarshanButton: string;
  darshanTitle: string;
  darshanSubtitle: string;
  darshanBlessings: string;
  darshanRestart: string;
  downloadCertificate: string;
  downloadBackup: string;
  downloadSuccess: string;
  downloadError: string;
  recentSessions: string;
  noSessionsFound: string;
  noSessionsSubtitle: string;
  totalNaamWritten: string;
  completedMalas: string;
  totalSessions: string;
  offlineSaved: string;
  autoCommitDelay: string;
  autoCommitDelayDesc: string;
  touchSensitivity: string;
  palmRejectionTitle: string;
  palmRejectionDesc: string;
  activeStatus: string;
  saveSettings: string;
  saveSuccess: string;
  privacyPolicy: string;
  termsAndConditions: string;
  cookiesPolicy: string;
  footerTagline: string;
  nonCommercialTitle: string;
  refundNotice: string;
  noTrackingDetails: string;
  copyrightText: string;
  navHome: string;
  navWrite: string;
  navDashboard: string;
  navHistory: string;
  navSettings: string;
  languageSelector: string;
  refresh: string;
  editName: string;
  saveName: string;
  completedStatus: string;
  fastDelay: string;
  naturalDelay: string;
  relaxedDelay: string;
  feedbackTooShort: string;
  feedbackIncomplete: string;
  feedbackEmpty: string;
}

export const TRANSLATIONS: Record<LanguageCode, Translations> = {
  hi: {
    appName: 'हरिनाम',
    appSubName: 'डिजिटल नाम लेखन',
    appTagline: 'डिजिटल नाम लेखन — मन की शांति और एकाग्रता के लिए पावन साधना।',
    startWriting: 'नाम लेखन प्रारंभ करें ✍️',
    dashboard: 'साधना एवं भक्ति डैशबोर्ड',
    history: 'साधना इतिहास',
    settings: 'लेखन सेटिंग्स',
    privacy: 'गोपनीयता नीति',
    terms: 'नियम व शर्तें',
    cookies: 'कुकीज़ नीति',
    devoteeNameLabel: 'साधक का नाम (Devotee Name)',
    devoteeNamePlaceholder: 'अपना नाम दर्ज करें (उदा. लोकेश)',
    greetingDevotee: 'नमस्ते',
    devoteeBadge: 'साधक',
    selectNaamTitle: 'पवित्र नाम चुनें',
    selectNaamSubtitle: 'अपनी साधना के लिए पवित्र नाम का चयन करें',
    step1Of2: 'चरण 1 / 2',
    step2Of2: 'चरण 2 / 2',
    nextStep: 'आगे बढ़ें (माला लक्ष्य) →',
    prevStep: '← नाम बदलें',
    backToHome: '← मुख्य पृष्ठ',
    selectMalaTitle: 'माला लक्ष्य निर्धारित करें',
    selectMalaSubtitle: '1 माला = 108 पावन नाम लेखन',
    selectedNaamBadge: 'चयनित नाम',
    malaUnit: 'माला',
    naamUnit: 'नाम',
    customCount: 'कस्टम माला संख्या',
    startSadhana: 'साधना प्रारंभ करें ✍️',
    starting: 'प्रारंभ हो रहा है...',
    clearCanvas: 'कैनवास साफ़ करें',
    target: 'लक्ष्य',
    totalNaam: 'कुल नाम',
    mala: 'माला',
    writeHere: 'यहाँ लिखें',
    offlineBadge: 'ऑफ़लाइन',
    malaCompletedTitle: 'माला पूर्ण हुई! 🎉',
    malaCompletedDesc: 'आपने प्रभु के 108 पावन नाम सफलतापूर्वक लिख लिए हैं।',
    malaMantra: '॥ शुभम् भवतु • मंगलम् भवतु ॥',
    nextMalaButton: 'अगली माला शुरू करें →',
    viewDarshanButton: 'दर्शन एवं आशीर्वाद प्राप्त करें ✨',
    darshanTitle: 'दिव्य दर्शन एवं पावन आशीर्वाद',
    darshanSubtitle: 'आपकी पावन नाम लेखन साधना पूर्ण हुई',
    darshanBlessings: 'प्रभु एवं समस्त दिव्य शक्तियों का मंगलमय आशीर्वाद सदैव आपके साथ रहे।',
    darshanRestart: 'नई साधना प्रारंभ करें',
    downloadCertificate: 'साधना प्रमाणपत्र डाउनलोड करें',
    downloadBackup: 'साधना रिकॉर्ड बैकअप डाउनलोड (JSON)',
    downloadSuccess: 'बैकअप सफलतापूर्वक डाउनलोड हुआ!',
    downloadError: 'बैकअप डाउनलोड करने में त्रुटि हुई',
    recentSessions: 'हालिया साधना इतिहास',
    noSessionsFound: 'अभी तक कोई साधना सत्र दर्ज नहीं हुआ है।',
    noSessionsSubtitle: 'जब आप नाम लेखन पूर्ण करेंगे, आपका इतिहास यहाँ सुरक्षित रहेगा।',
    totalNaamWritten: 'कुल नाम लिखित',
    completedMalas: 'पूर्ण माला',
    totalSessions: 'कुल सत्र',
    offlineSaved: 'लोकल सुरक्षित',
    autoCommitDelay: 'स्वतः साफ़ (Auto-commit) समय',
    autoCommitDelayDesc: 'नाम पूरा लिखने के बाद कैनवास साफ़ होकर अगला नाम शुरू होने का विराम समय।',
    touchSensitivity: 'स्पर्श संवेदनशीलता',
    palmRejectionTitle: 'आकस्मिक स्पर्श सुरक्षा (Palm Rejection)',
    palmRejectionDesc: 'अनजाने में हुए हल्के स्पर्श या डॉट को खारिज करना।',
    activeStatus: 'सक्रिय (Active)',
    saveSettings: 'सेटिंग्स सुरक्षित करें',
    saveSuccess: 'सेटिंग्स सफलतापूर्वक सुरक्षित हुईं!',
    privacyPolicy: 'गोपनीयता नीति (Privacy Policy)',
    termsAndConditions: 'नियम और शर्तें (Terms of Service)',
    cookiesPolicy: 'कुकीज़ नीति (Cookies Policy)',
    footerTagline: 'मन की शांति और भगवद्-अनुग्रह के लिए समर्पित',
    nonCommercialTitle: '100% निःशुल्क आध्यात्मिक सेवा (Non-Commercial)',
    refundNotice: 'रिफंड नीति लागू नहीं (Refund Not Applicable) — हरिनाम पूरी तरह निःशुल्क और निस्वार्थ साधना ऐप है।',
    noTrackingDetails: 'शून्य तृतीय-पक्ष ट्रैकिंग (No 3rd-Party Embeds / Trackers) • डेटा केवल आपकी निजी डिवाइस पर सुरक्षित',
    copyrightText: '© 2026 हरिनाम (Harinaam) • Digital Naam Lekhan',
    navHome: 'मुख्य',
    navWrite: 'लेखन',
    navDashboard: 'डैशबोर्ड',
    navHistory: 'इतिहास',
    navSettings: 'सेटिंग्स',
    languageSelector: 'भाषा चुनें (Select Language)',
    refresh: 'रिफ्रेश',
    editName: 'बदलें',
    saveName: 'सुरक्षित करें',
    completedStatus: 'पूर्ण',
    fastDelay: 'तेज़ (550ms)',
    naturalDelay: 'सहज (750ms)',
    relaxedDelay: 'धीमा (1000ms)',
    feedbackTooShort: 'स्पर्श बहुत छोटा है — कृपया पूरा नाम लिखें',
    feedbackIncomplete: 'अधूरा शब्द — कृपया पूरा नाम लिखें',
    feedbackEmpty: 'कोई लिखावट नहीं मिली',
  },
  en: {
    appName: 'Harinaam',
    appSubName: 'Digital Naam Lekhan',
    appTagline: 'Digital Naam Lekhan — Sacred spiritual practice for peace, mindfulness, and divine devotion.',
    startWriting: 'Start Sacred Writing ✍️',
    dashboard: 'Devotion Dashboard',
    history: 'Sadhana History',
    settings: 'Writing Settings',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookies Policy',
    devoteeNameLabel: 'Devotee Name',
    devoteeNamePlaceholder: 'Enter your name (e.g. Lokesh)',
    greetingDevotee: 'Namaste',
    devoteeBadge: 'Devotee',
    selectNaamTitle: 'Select Holy Mantra / Naam',
    selectNaamSubtitle: 'Choose the divine name for your spiritual meditation practice',
    step1Of2: 'Step 1 of 2',
    step2Of2: 'Step 2 of 2',
    nextStep: 'Proceed to Mala Target →',
    prevStep: '← Change Naam',
    backToHome: '← Home',
    selectMalaTitle: 'Set Your Mala Target',
    selectMalaSubtitle: '1 Mala = 108 Sacred Name Inscriptions',
    selectedNaamBadge: 'Selected Holy Name',
    malaUnit: 'Mala',
    naamUnit: 'Names',
    customCount: 'Custom Mala Target',
    startSadhana: 'Begin Practice ✍️',
    starting: 'Starting...',
    clearCanvas: 'Clear Slate',
    target: 'Target',
    totalNaam: 'Total Names',
    mala: 'Mala',
    writeHere: 'Write Here',
    offlineBadge: 'Offline',
    malaCompletedTitle: 'Mala Completed! 🎉',
    malaCompletedDesc: 'You have successfully written 108 sacred holy names.',
    malaMantra: '॥ Peace • Devotion • Blessings ॥',
    nextMalaButton: 'Begin Next Mala →',
    viewDarshanButton: 'Receive Divine Darshan & Blessings ✨',
    darshanTitle: 'Divine Darshan & Blessings',
    darshanSubtitle: 'Your sacred Naam Lekhan practice is complete',
    darshanBlessings: 'May divine grace and eternal peace illuminate your spiritual path always.',
    darshanRestart: 'Start New Practice',
    downloadCertificate: 'Download Sadhana Certificate',
    downloadBackup: 'Download Sadhana Backup (JSON)',
    downloadSuccess: 'Backup downloaded successfully!',
    downloadError: 'Error downloading backup file',
    recentSessions: 'Recent Practice History',
    noSessionsFound: 'No practice sessions recorded yet.',
    noSessionsSubtitle: 'Once you write and complete a session, your spiritual ledger will appear here.',
    totalNaamWritten: 'Total Names Written',
    completedMalas: 'Completed Malas',
    totalSessions: 'Total Sessions',
    offlineSaved: 'Locally Stored',
    autoCommitDelay: 'Auto-Commit Delay',
    autoCommitDelayDesc: 'The brief pause after completing a word before the slate resets for the next name.',
    touchSensitivity: 'Touch Sensitivity',
    palmRejectionTitle: 'Accidental Palm / Tap Rejection',
    palmRejectionDesc: 'Filters unintentional light touches, dots, and resting palm gestures.',
    activeStatus: 'Active',
    saveSettings: 'Save Preferences',
    saveSuccess: 'Preferences saved successfully!',
    privacyPolicy: 'Privacy Policy',
    termsAndConditions: 'Terms & Conditions',
    cookiesPolicy: 'Cookies Policy',
    footerTagline: 'Dedicated to inner tranquility, mindfulness, and divine grace',
    nonCommercialTitle: '100% Free Spiritual Platform (Non-Commercial)',
    refundNotice: 'Refund Policy: Not Applicable — Harinaam is a 100% free, selfless spiritual devotional application.',
    noTrackingDetails: 'Zero 3rd-Party Trackers (No Ads, No Pixels) • All handwriting data stays safely on your private device.',
    copyrightText: '© 2026 Harinaam • Digital Naam Lekhan',
    navHome: 'Home',
    navWrite: 'Write',
    navDashboard: 'Dashboard',
    navHistory: 'History',
    navSettings: 'Settings',
    languageSelector: 'Select Language',
    refresh: 'Refresh',
    editName: 'Edit',
    saveName: 'Save',
    completedStatus: 'Completed',
    fastDelay: 'Fast (550ms)',
    naturalDelay: 'Natural (750ms)',
    relaxedDelay: 'Relaxed (1000ms)',
    feedbackTooShort: 'Touch is too small — please write the complete name',
    feedbackIncomplete: 'Incomplete word — please write the full holy name',
    feedbackEmpty: 'No handwriting detected',
  },
  te: {
    appName: 'హరినామ',
    appSubName: 'డిజిటల్ నామ లేఖనం',
    appTagline: 'డిజిటల్ నామ లేఖనం — మనశ్శాంతి, ఏకాగ్రత మరియు భక్తి కోసం పవిత్ర సాధన.',
    startWriting: 'నామ లేఖనం ప్రారంభించండి ✍️',
    dashboard: 'సాధనా డాష్‌బోర్డ్',
    history: 'సాధనా చరిత్ర',
    settings: 'రాత సెట్టింగ్‌లు',
    privacy: 'గోప్యతా విధానం',
    terms: 'నిబంధనలు & షరతులు',
    cookies: 'కుకీల విధానం',
    devoteeNameLabel: 'భక్తుని పేరు (Devotee Name)',
    devoteeNamePlaceholder: 'మీ పేరు నమోదు చేయండి (ఉదా. లోకేష్)',
    greetingDevotee: 'నమస్కారం',
    devoteeBadge: 'భక్తుడు',
    selectNaamTitle: 'పవిత్ర నామాన్ని ఎంచుకోండి',
    selectNaamSubtitle: 'మీ సాధన కోసం పవిత్ర నామాన్ని ఎంచుకోండి',
    step1Of2: 'దశ 1 / 2',
    step2Of2: 'దశ 2 / 2',
    nextStep: 'మాలా లక్ష్యానికి వెళ్లండి →',
    prevStep: '← నామం మార్చండి',
    backToHome: '← ముఖచిత్రం',
    selectMalaTitle: 'మాలా లక్ష్యాన్ని నిర్ణయించండి',
    selectMalaSubtitle: '1 మాల = 108 పవిత్ర నామములు',
    selectedNaamBadge: 'ఎంచుకున్న నామం',
    malaUnit: 'మాల',
    naamUnit: 'నామములు',
    customCount: 'అనుకూల మాల సంఖ్య',
    startSadhana: 'సాధన ప్రారంభించండి ✍️',
    starting: 'ప్రారంభమవుతోంది...',
    clearCanvas: 'స్లేట్ శుభ్రం చేయండి',
    target: 'లక్ష్యం',
    totalNaam: 'మొత్తం నామములు',
    mala: 'మాల',
    writeHere: 'ఇక్కడ రాయండి',
    offlineBadge: 'ఆఫ్‌లైన్',
    malaCompletedTitle: 'మాల పూర్తయింది! 🎉',
    malaCompletedDesc: 'మీరు 108 పవిత్ర నామములను విజయవంతంగా రాశారు.',
    malaMantra: '॥ శుభం భవతు • మంగళం భవతు ॥',
    nextMalaButton: 'తరువాతి మాల ప్రారంభించండి →',
    viewDarshanButton: 'దివ్య దర్శనం & ఆశీస్సులు పొందండి ✨',
    darshanTitle: 'దివ్య దర్శనం మరియు ఆశీస్సులు',
    darshanSubtitle: 'మీ పవిత్ర నామ లేఖన సాధన పూర్తయింది',
    darshanBlessings: 'భగవంతుని దివ్య ఆశీస్సులు మీకు ఎల్లప్పుడూ శాంతిని చేకూర్చుగాక.',
    darshanRestart: 'కొత్త సాధన ప్రారంభించండి',
    downloadCertificate: 'ప్రమాణపత్రం డౌన్‌లోడ్ చేయండి',
    downloadBackup: 'సాధనా బ్యాకప్ డౌన్‌లోడ్ (JSON)',
    downloadSuccess: 'బ్యాకప్ విజయవంతంగా డౌన్‌లోడ్ అయింది!',
    downloadError: 'డౌన్‌లోడ్ చేయడంలో లోపం సంభవించింది',
    recentSessions: 'ఇటీవలి సాధనా చరిత్ర',
    noSessionsFound: 'ఇంకా ఎటువంటి సాధనా సెషన్‌లు నమోదు కాలేదు.',
    noSessionsSubtitle: 'మీరు సాధన పూర్తి చేసినప్పుడు మీ చరిత్ర ఇక్కడ కనిపిస్తుంది.',
    totalNaamWritten: 'రాసిన మొత్తం నామములు',
    completedMalas: 'పూర్తయిన మాలలు',
    totalSessions: 'మొత్తం సెషన్‌లు',
    offlineSaved: 'లోకల్ సేవ్',
    autoCommitDelay: 'ఆటో-కమిట్ సమయం',
    autoCommitDelayDesc: 'నామం రాసిన తర్వాత స్లేట్ క్లియర్ అయ్యే విరామ సమయం.',
    touchSensitivity: 'స్పర్శ సున్నితత్వం',
    palmRejectionTitle: 'అనుకోని తాకిడి రక్షణ',
    palmRejectionDesc: 'అనుకోకుండా తగిలే చేతి తాకిడులను నిరోధిస్తుంది.',
    activeStatus: 'సక్రియం',
    saveSettings: 'సెట్టింగ్‌లు సేవ్ చేయండి',
    saveSuccess: 'సెట్టింగ్‌లు విజయవంతంగా సేవ్ చేయబడ్డాయి!',
    privacyPolicy: 'గోప్యతా విధానం (Privacy Policy)',
    termsAndConditions: 'నిబంధనలు & షరతులు (Terms of Service)',
    cookiesPolicy: 'కుకీల విధానం (Cookies Policy)',
    footerTagline: 'మనశ్శాంతి మరియు భగవదనుగ్రహానికి అంకితం',
    nonCommercialTitle: '100% ఉచిత ఆధ్యాత్మిక సేవ (Non-Commercial)',
    refundNotice: 'రీఫండ్ విధానం వర్తించదు (Refund Not Applicable) — హరినామ పూర్తిగా ఉచిత మరియు నిస్వార్థ సాధనా యాప్.',
    noTrackingDetails: 'జీరో థర్డ్-పార్టీ ట్రాకర్లు • మీ డేటా మీ పరికరంలో మాత్రమే సురక్షితంగా ఉంటుంది.',
    copyrightText: '© 2026 హరినామ (Harinaam) • Digital Naam Lekhan',
    navHome: 'హోమ్',
    navWrite: 'రాయండి',
    navDashboard: 'డాష్‌బోర్డ్',
    navHistory: 'చరిత్ర',
    navSettings: 'సెట్టింగ్‌లు',
    languageSelector: 'భాషను ఎంచుకోండి',
    refresh: 'రిఫ్రెష్',
    editName: 'మార్చు',
    saveName: 'సేవ్',
    completedStatus: 'పూర్తయింది',
    fastDelay: 'వేగవంతం (550ms)',
    naturalDelay: 'సహజం (750ms)',
    relaxedDelay: 'నెమ్మదిగా (1000ms)',
    feedbackTooShort: 'స్పర్శ చాలా చిన్నది — దయచేసి పూర్తి నామం రాయండి',
    feedbackIncomplete: 'అసంపూర్ణ పదం — దయచేసి పూర్తి నామం రాయండి',
    feedbackEmpty: 'ఎటువంటి రాత గుర్తించబడలేదు',
  },
  ta: {
    appName: 'ஹரிநாமம்',
    appSubName: 'டிஜிட்டல் நாம லேகனம்',
    appTagline: 'டிஜிட்டல் நாம லேகனம் — மன அமைதி, ஒருமுகப்பாடு மற்றும் பக்திக்குரிய புனித ஆன்மீகப் பயிற்சி.',
    startWriting: 'நாமம் எழுதத் தொடங்குங்கள் ✍️',
    dashboard: 'பக்தி டாஷ்போர்டு',
    history: 'சாதனை வரலாறு',
    settings: 'எழுத்து அமைப்புகள்',
    privacy: 'தனியுரிமைக் கொள்கை',
    terms: 'விதிமுறைகள் & நிபந்தனைகள்',
    cookies: 'குக்கீஸ் கொள்கை',
    devoteeNameLabel: 'பக்தர் பெயர் (Devotee Name)',
    devoteeNamePlaceholder: 'உங்கள் பெயரை உள்ளிடவும் (எ.கா. லோகேஷ்)',
    greetingDevotee: 'வணக்கம்',
    devoteeBadge: 'பக்தர்',
    selectNaamTitle: 'புனித நாமத்தைத் தேர்ந்தெடுக்கவும்',
    selectNaamSubtitle: 'உங்கள் பயிற்சிக்கான திருநாமத்தைத் தேர்ந்தெடுக்கவும்',
    step1Of2: 'படி 1 / 2',
    step2Of2: 'படி 2 / 2',
    nextStep: 'மாலை இலக்குக்குச் செல்லவும் →',
    prevStep: '← நாமம் மாற்றுக',
    backToHome: '← முகப்பு',
    selectMalaTitle: 'மாலை இலக்கைத் தீர்மானிக்கவும்',
    selectMalaSubtitle: '1 மாலை = 108 புனித நாமங்கள்',
    selectedNaamBadge: 'தேர்ந்தெடுக்கப்பட்ட நாமம்',
    malaUnit: 'மாலை',
    naamUnit: 'நாமங்கள்',
    customCount: 'தனிப்பயன் மாலை எண்ணிக்கை',
    startSadhana: 'சாதனையைத் தொடங்கவும் ✍️',
    starting: 'தொடங்குகிறது...',
    clearCanvas: 'அழிக்கவும்',
    target: 'இலக்கு',
    totalNaam: 'மொத்த நாமங்கள்',
    mala: 'மாலை',
    writeHere: 'இங்கே எழுதவும்',
    offlineBadge: 'ஆஃப்லைன்',
    malaCompletedTitle: 'மாலை நிறைவடைந்தது! 🎉',
    malaCompletedDesc: 'நீங்கள் 108 புனித நாமங்களை வெற்றிகரமாக எழுதிவிட்டீர்கள்.',
    malaMantra: '॥ சுபம் பவது • மங்களம் பவது ॥',
    nextMalaButton: 'அடுத்த மாலையைத் தொடங்கவும் →',
    viewDarshanButton: 'தெய்வீக தரிசனம் & ஆசிகள் பெறுக ✨',
    darshanTitle: 'தெய்வீக தரிசனம் மற்றும் ஆசிகள்',
    darshanSubtitle: 'உங்கள் நாம லேகன சாதனை நிறைவடைந்தது',
    darshanBlessings: 'இறைவனின் அருள் உங்கள் வாழ்வில் எப்போதும் அமைதியையும் நன்மையையும் கொண்டு சேர்க்கட்டும்.',
    darshanRestart: 'புதிய சாதனையைத் தொடங்கவும்',
    downloadCertificate: 'சான்றிதழ் பதிவிறக்கம்',
    downloadBackup: 'சாதனை காப்புப் பிரதி (JSON)',
    downloadSuccess: 'வெற்றிகரமாகப் பதிவிறக்கப்பட்டது!',
    downloadError: 'பதிவிறக்குவதில் பிழை ஏற்பட்டது',
    recentSessions: 'சமீபத்திய சாதனை அமர்வுகள்',
    noSessionsFound: 'இதுவரை எந்த சாதனை அமர்வும் பதிவாகவில்லை.',
    noSessionsSubtitle: 'நீங்கள் சாதனையை முடிக்கும்போது உங்கள் வரலாறு இங்கே தோன்றும்.',
    totalNaamWritten: 'எழுதப்பட்ட மொத்த நாமங்கள்',
    completedMalas: 'நிறைவுற்ற மாலைகள்',
    totalSessions: 'மொத்த அமர்வுகள்',
    offlineSaved: 'உள்ளூர் சேமிப்பு',
    autoCommitDelay: 'தானியங்கி சமர்ப்பிப்பு நேரம்',
    autoCommitDelayDesc: 'எழுதி முடித்த பின் அடுத்த நாமத்திற்கு பலகை தயாராகும் நேரம்.',
    touchSensitivity: 'தொடு உணர்திறன்',
    palmRejectionTitle: 'தற்செயலான தொடுதல் பாதுகாப்பு',
    palmRejectionDesc: 'தேவையற்ற லேசான தொடுதல்களை நிராகரிக்கிறது.',
    activeStatus: 'செயலில் உள்ளது',
    saveSettings: 'அமைப்புகளைச் சேமிக்கவும்',
    saveSuccess: 'அமைப்புகள் வெற்றிகரமாகச் சேமிக்கப்பட்டன!',
    privacyPolicy: 'தனியுரிமைக் கொள்கை (Privacy Policy)',
    termsAndConditions: 'விதிமுறைகள் & நிபந்தனைகள் (Terms of Service)',
    cookiesPolicy: 'குக்கீஸ் கொள்கை (Cookies Policy)',
    footerTagline: 'மன அமைதி மற்றும் இறை அருளுக்கு அர்ப்பணிக்கப்பட்டது',
    nonCommercialTitle: '100% இலவச ஆன்மீக சேவை (Non-Commercial)',
    refundNotice: 'பணத்தைத் திரும்பப்பெறும் கொள்கை பொருந்தாது (Refund Not Applicable) — ஹரிநாமம் முற்றிலும் இலவச மற்றும் தன்னலமற்ற ஆன்மீக செயலி.',
    noTrackingDetails: 'பூஜ்ஜிய மூன்றாம் தரப்பு கண்காணிப்பு • உங்கள் தரவு உங்கள் சாதனத்தில் மட்டுமே பாதுகாப்பானது.',
    copyrightText: '© 2026 ஹரிநாமம் (Harinaam) • Digital Naam Lekhan',
    navHome: 'முகப்பு',
    navWrite: 'எழுதுக',
    navDashboard: 'டாஷ்போர்டு',
    navHistory: 'வரலாறு',
    navSettings: 'அமைப்புகள்',
    languageSelector: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    refresh: 'புதுப்பி',
    editName: 'மாற்று',
    saveName: 'சேமி',
    completedStatus: 'முடிந்தது',
    fastDelay: 'வேகமாக (550ms)',
    naturalDelay: 'இயற்கையானது (750ms)',
    relaxedDelay: 'மெதுவாக (1000ms)',
    feedbackTooShort: 'தொடுதல் மிகவும் சிறியது — தயவுசெய்து முழுப் பெயரை எழுதவும்',
    feedbackIncomplete: 'முழுமையடையாத சொல் — தயவுசெய்து முழுப் பெயரை எழுதவும்',
    feedbackEmpty: 'எந்த எழுத்தும் கண்டறியப்படவில்லை',
  },
  kn: {
    appName: 'ಹರಿನಾಮ',
    appSubName: 'ಡಿಜಿಟಲ್ ನಾಮ ಲೇಖನ',
    appTagline: 'ಡಿಜಿಟಲ್ ನಾಮ ಲೇಖನ — ಮನಃಶಾಂತಿ, ಏಕಾಗ್ರತೆ ಮತ್ತು ಭಕ್ತಿಗಾಗಿ ಪವಿತ್ರ ಸಾಧನೆ.',
    startWriting: 'ನಾಮ ಲೇಖನ ಪ್ರಾರಂಭಿಸಿ ✍️',
    dashboard: 'ಭಕ್ತಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    history: 'ಸಾಧನಾ ಇತಿಹಾಸ',
    settings: 'ಬರವಣಿಗೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    privacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    terms: 'ನಿಯಮಗಳು & ಷರತ್ತುಗಳು',
    cookies: 'ಕುಕೀಸ್ ನೀತಿ',
    devoteeNameLabel: 'ಭಕ್ತರ ಹೆಸರು (Devotee Name)',
    devoteeNamePlaceholder: 'ನಿಮ್ಮ ಹೆಸರನ್ನು ನಮೂದಿಸಿ (ಉದಾ. ಲೋಕೇಶ್)',
    greetingDevotee: 'ನಮಸ್ಕಾರ',
    devoteeBadge: 'ಭಕ್ತ',
    selectNaamTitle: 'ಪವಿತ್ರ ನಾಮವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    selectNaamSubtitle: 'ನಿಮ್ಮ ಸಾಧನೆಗಾಗಿ ಪವಿತ್ರ ನಾಮವನ್ನು ಆರಿಸಿ',
    step1Of2: 'ಹಂತ 1 / 2',
    step2Of2: 'ಹಂತ 2 / 2',
    nextStep: 'ಮಾಲಾ ಗುರಿಗೆ ಮುಂದುವರಿಯಿರಿ →',
    prevStep: '← ನಾಮ ಬದಲಿಸಿ',
    backToHome: '← ಮುಖ್ಯ ಪುಟ',
    selectMalaTitle: 'ಮಾಲಾ ಗುರಿಯನ್ನು ನಿರ್ಧರಿಸಿ',
    selectMalaSubtitle: '1 ಮಾಲೆ = 108 ಪವಿತ್ರ ನಾಮಗಳು',
    selectedNaamBadge: 'ಆಯ್ಕೆಮಾಡಿದ ನಾಮ',
    malaUnit: 'ಮಾಲೆ',
    naamUnit: 'ನಾಮಗಳು',
    customCount: 'ಕಸ್ಟಮ್ ಮಾಲೆ ಸಂಖ್ಯೆ',
    startSadhana: 'ಸಾಧನೆ ಪ್ರಾರಂಭಿಸಿ ✍️',
    starting: 'ಪ್ರಾರಂಭವಾಗುತ್ತಿದೆ...',
    clearCanvas: 'ಸ್ಲೇಟ್ ಕ್ಲಿಯರ್ ಮಾಡಿ',
    target: 'ಗುರಿ',
    totalNaam: 'ಒಟ್ಟು ನಾಮಗಳು',
    mala: 'ಮಾಲೆ',
    writeHere: 'ಇಲ್ಲಿ ಬರೆಯಿರಿ',
    offlineBadge: 'ಆಫ್‌ಲೈನ್',
    malaCompletedTitle: 'ಮಾಲೆ ಪೂರ್ಣಗೊಂಡಿದೆ! 🎉',
    malaCompletedDesc: 'ನೀವು 108 ಪವಿತ್ರ ನಾಮಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಬರೆದಿದ್ದೀರಿ.',
    malaMantra: '॥ ಶುಭಂ ಭವತು • ಮಂಗಳಂ ಭವತು ॥',
    nextMalaButton: 'ಮುಂದಿನ ಮಾಲೆ ಪ್ರಾರಂಭಿಸಿ →',
    viewDarshanButton: 'ದಿವ್ಯ ದರ್ಶನ & ಆಶೀರ್ವಾದ ಪಡೆಯಿರಿ ✨',
    darshanTitle: 'ದಿವ್ಯ ದರ್ಶನ ಮತ್ತು ಆಶೀರ್ವಾದ',
    darshanSubtitle: 'ನಿಮ್ಮ ಪವಿತ್ರ ನಾಮ ಲೇಖನ ಸಾಧನೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    darshanBlessings: 'ಭಗವಂತನ ದಿವ್ಯ ಆಶೀರ್ವಾದವು ಸದಾ ನಿಮ್ಮ ಜೀವನದಲ್ಲಿ ಶಾಂತಿ ಮತ್ತು ಸಮೃದ್ಧಿಯನ್ನು ತರಲಿ.',
    darshanRestart: 'ಹೊಸ ಸಾಧನೆ ಪ್ರಾರಂಭಿಸಿ',
    downloadCertificate: 'ಪ್ರಮಾಣಪತ್ರ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    downloadBackup: 'ಸಾಧನಾ ಬ್ಯಾಕಪ್ (JSON)',
    downloadSuccess: 'ಬ್ಯಾಕಪ್ ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!',
    downloadError: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡುವಾಗ ದೋಷ ಸಂಭವಿಸಿದೆ',
    recentSessions: 'ಇತ್ತೀಚಿನ ಸಾಧನಾ ಇತಿಹಾಸ',
    noSessionsFound: 'ಇನ್ನೂ ಯಾವುದೇ ಸಾಧನಾ ಅವಧಿ ದಾಖಲಾಗಿಲ್ಲ.',
    noSessionsSubtitle: 'ನೀವು ಸಾಧನೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದಾಗ ನಿಮ್ಮ ಇತಿಹಾಸವು ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.',
    totalNaamWritten: 'ಬರೆದ ಒಟ್ಟು ನಾಮಗಳು',
    completedMalas: 'ಪೂರ್ಣಗೊಂಡ ಮಾಲೆಗಳು',
    totalSessions: 'ಒಟ್ಟು ಅವಧಿಗಳು',
    offlineSaved: 'ಲೋಕಲ್ ಸೇವ್',
    autoCommitDelay: 'ಸ್ವಯಂ ಕ್ಲಿಯರ್ ಸಮಯ',
    autoCommitDelayDesc: 'ನಾಮ ಬರೆದ ನಂತರ ಸ್ಲೇಟ್ ಕ್ಲಿಯರ್ ಆಗುವ ವಿರಾಮ ಸಮಯ.',
    touchSensitivity: 'ಸ್ಪರ್ಶ ಸಂವೇದನೆ',
    palmRejectionTitle: 'ಅನಗತ್ಯ ಸ್ಪರ್ಶ ರಕ್ಷಣೆ',
    palmRejectionDesc: 'ಅನಗತ್ಯ ಹಗುರವಾದ ಸ್ಪರ್ಶಗಳನ್ನು ತಿರಸ್ಕರಿಸುತ್ತದೆ.',
    activeStatus: 'ಸಕ್ರಿಯ',
    saveSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಉಳಿಸಿ',
    saveSuccess: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
    privacyPolicy: 'ಗೌಪ್ಯತಾ ನೀತಿ (Privacy Policy)',
    termsAndConditions: 'ನಿಯಮಗಳು & ಷರತ್ತುಗಳು (Terms of Service)',
    cookiesPolicy: 'ಕುಕೀಸ್ ನೀತಿ (Cookies Policy)',
    footerTagline: 'ಮನಃಶಾಂತಿ ಮತ್ತು ಭಗವಂತನ ಅನುಗ್ರಹಕ್ಕೆ ಸಮರ್ಪಿತ',
    nonCommercialTitle: '100% ಉಚಿತ ಆಧ್ಯಾತ್ಮಿಕ ಸೇವೆ (Non-Commercial)',
    refundNotice: 'ಮರುಪಾವತಿ ನೀತಿ ಅನ್ವಯಿಸುವುದಿಲ್ಲ (Refund Not Applicable) — ಹರಿನಾಮ ಸಂಪೂರ್ಣ ಉಚಿತ ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸಾಧನಾ ಆ್ಯಪ್.',
    noTrackingDetails: 'ಶೂನ್ಯ ಮೂರನೇ ವ್ಯಕ್ತಿಯ ಟ್ರ್ಯಾಕಿಂಗ್ • ನಿಮ್ಮ ಡೇಟಾ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಮಾತ್ರ ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ.',
    copyrightText: '© 2026 ಹರಿನಾಮ (Harinaam) • Digital Naam Lekhan',
    navHome: 'ಮುಖಪುಟ',
    navWrite: 'ಬರೆಯಿರಿ',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navHistory: 'ಇತಿಹಾಸ',
    navSettings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    languageSelector: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    refresh: 'ರಿಫ್ರೆಶ್',
    editName: 'ಬದಲಿಸಿ',
    saveName: 'ಉಳಿಸಿ',
    completedStatus: 'ಪೂರ್ಣಗೊಂಡಿದೆ',
    fastDelay: 'ವೇಗವಾಗಿ (550ms)',
    naturalDelay: 'ಸಹಜ (750ms)',
    relaxedDelay: 'ನಿಧಾನವಾಗಿ (1000ms)',
    feedbackTooShort: 'ಸ್ಪರ್ಶವು ತುಂಬಾ ಚಿಕ್ಕದಾಗಿದೆ — ದಯವಿಟ್ಟು ಪೂರ್ಣ ನಾಮ ಬರೆಯಿರಿ',
    feedbackIncomplete: 'ಅಪೂರ್ಣ ಪದ — ದಯವಿಟ್ಟು ಪೂರ್ಣ ನಾಮ ಬರೆಯಿರಿ',
    feedbackEmpty: 'ಯಾವುದೇ ಬರವಣಿಗೆ ಪತ್ತೆಯಾಗಿಲ್ಲ',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
  languages: Array<{ code: LanguageCode; label: string; nativeName: string }>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LANGUAGES_LIST: Array<{ code: LanguageCode; label: string; nativeName: string }> = [
  { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'en', label: 'English', nativeName: 'English' },
  { code: 'te', label: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('hi');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('harinaam_user_language') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) {
        setLanguageState(saved);
      }
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('harinaam_user_language', lang);
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.hi;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages: LANGUAGES_LIST }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'hi' as LanguageCode,
      setLanguage: () => {},
      t: TRANSLATIONS.hi,
      languages: LANGUAGES_LIST,
    };
  }
  return context;
}
