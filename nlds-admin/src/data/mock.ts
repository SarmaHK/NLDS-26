// ═══════════════════════════════════════════════════════
// NLDS 2026 — MOCK DATA LAYER
// Replace with real API calls during backend integration.
// ═══════════════════════════════════════════════════════

import type { Registration, Participant, AdminUser, AuditEntry, CvEntry, PhotoEntry } from '@/types';

const ENTITIES = ['UoM', 'USJ', 'SLIIT', 'UoK', 'NSBM', 'IIT', 'KDU', 'UoJ', 'UoP', 'EUSL'];
const POSITIONS = ['LCP', 'LCVP', 'TL', 'Manager', 'Member', 'EB'];
const FOODS = ['Vegetarian', 'Non-Vegetarian', 'Vegan'];
const READINESS = ['Ready', 'Mostly Ready', 'Preparing'];

function id(i: number) { return `00000000-0000-0000-0000-${String(i).padStart(12, '0')}`; }
function ref(i: number) { return `NLDS26-${String(i).padStart(4, '0')}`; }
function date(daysAgo: number) { return new Date(Date.now() - daysAgo * 86400000).toISOString(); }

const names = [
    'Nethmi Jayawardena', 'Kavindu Dissanayake', 'Dinuka Samarasekara', 'Isuri Wickramasinghe',
    'Ravindu Perera', 'Tharushi Fernando', 'Sandun Rajapaksha', 'Kaveesha de Silva',
    'Hiruni Gunawardena', 'Lahiru Bandara', 'Sachini Kumari', 'Thilina Rathnayake',
    'Dilini Perera', 'Nuwan Gamage', 'Rashmi Fonseka', 'Chamith Jayasuriya',
    'Amaya Senanayake', 'Pasan Weerasinghe', 'Nimesha Karunaratne', 'Ishara Madushan',
    'Hansi Kulathunga', 'Buddhi Lakmal', 'Maneesha Thilakarathna', 'Yohan Liyanage',
];

const statuses: Registration['status'][] = ['SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED', 'CANCELLED'];

export const mockRegistrations: Registration[] = names.map((name, i) => ({
    id: id(i + 1),
    referenceCode: ref(842 - i),
    participantId: id(100 + i),
    participantName: name,
    participantEmail: `${name.split(' ')[0].toLowerCase()}@gmail.com`,
    entity: ENTITIES[i % ENTITIES.length],
    entityCode: ENTITIES[i % ENTITIES.length],
    participantType: i % 3 === 0 ? 'NEWBIE' : 'OLDBIE',
    currentPosition: POSITIONS[i % POSITIONS.length],
    aiesecEmail: i % 3 !== 0 ? `${name.split(' ')[0].toLowerCase()}@aiesec.net` : null,
    foodPreference: FOODS[i % FOODS.length],
    medicalConditions: i % 5 === 0 ? 'Asthma' : null,
    guardianName: `Mr. ${name.split(' ')[1]}`,
    guardianContact: `07${String(i).padStart(8, '1')}`,
    missionGoal: 'To develop leadership skills and contribute to AIESEC\'s mission of peace and fulfilment.',
    additionalInfo: i % 4 === 0 ? 'Requires wheelchair accessible facilities.' : null,
    readinessLevel: READINESS[i % READINESS.length],
    status: i < 3 ? 'SUBMITTED' : i < 6 ? 'UNDER_REVIEW' : i < 16 ? 'ACCEPTED' : i < 20 ? 'REJECTED' : 'CANCELLED',
    submittedAt: date(i),
    createdAt: date(i + 1),
    updatedAt: date(i),
    hasCv: i % 2 === 0,
    hasPhoto: i < 18,
}));

export const mockParticipants: Participant[] = names.map((name, i) => ({
    id: id(100 + i),
    fullName: name,
    preferredName: name.split(' ')[0],
    personalEmail: `${name.split(' ')[0].toLowerCase()}@gmail.com`,
    phone: `+947${String(i).padStart(8, '2')}`,
    gender: i % 2 === 0 ? 'Female' : 'Male',
    dateOfBirth: `200${i % 5}-0${(i % 9) + 1}-${10 + (i % 18)}`,
    nationalId: `${200 + i}${i * 3}${i * 7}${i % 2 === 0 ? 'V' : 'X'}`,
    aiesecEmail: i % 3 !== 0 ? `${name.split(' ')[0].toLowerCase()}@aiesec.net` : null,
    profilePhoto: i < 18 ? '/mock-photo.jpg' : null,
    entity: ENTITIES[i % ENTITIES.length],
    currentPosition: POSITIONS[i % POSITIONS.length],
    participantType: i % 3 === 0 ? 'NEWBIE' : 'OLDBIE',
    registrationCount: 1,
    createdAt: date(i + 5),
}));

export const mockAdmins: AdminUser[] = [
    { id: id(500), email: 'super@admin.com', role: 'SUPER_ADMIN', isActive: true, lastLoginAt: date(0), createdAt: date(30), permissions: [] },
    { id: id(501), email: 'kaveesha.oc@aiesec.lk', role: 'OC_VIEWER', isActive: true, lastLoginAt: date(1), createdAt: date(20), permissions: ['VIEW_REGISTRATIONS', 'VIEW_PERSONAL_INFO', 'VIEW_CV'] },
    { id: id(502), email: 'thilini.oc@aiesec.lk', role: 'OC_VIEWER', isActive: true, lastLoginAt: date(3), createdAt: date(15), permissions: ['VIEW_REGISTRATIONS', 'VIEW_PERSONAL_INFO', 'UPDATE_STATUS'] },
    { id: id(503), email: 'nuwan.oc@aiesec.lk', role: 'OC_VIEWER', isActive: false, lastLoginAt: date(10), createdAt: date(12), permissions: ['VIEW_REGISTRATIONS'] },
];

export const mockAuditLogs: AuditEntry[] = [
    { id: id(700), actorEmail: 'super@admin.com', actorRole: 'SUPER_ADMIN', action: 'ADMIN_CREATED', targetType: 'Admin', targetId: id(501), details: 'Created OC_VIEWER: kaveesha.oc@aiesec.lk', timestamp: date(20) },
    { id: id(701), actorEmail: 'super@admin.com', actorRole: 'SUPER_ADMIN', action: 'PERMISSION_GRANTED', targetType: 'Admin', targetId: id(501), details: 'Granted VIEW_REGISTRATIONS, VIEW_PERSONAL_INFO, VIEW_CV', timestamp: date(20) },
    { id: id(702), actorEmail: 'super@admin.com', actorRole: 'SUPER_ADMIN', action: 'ADMIN_CREATED', targetType: 'Admin', targetId: id(502), details: 'Created OC_VIEWER: thilini.oc@aiesec.lk', timestamp: date(15) },
    { id: id(703), actorEmail: 'super@admin.com', actorRole: 'SUPER_ADMIN', action: 'STATUS_UPDATED', targetType: 'Registration', targetId: ref(840), details: 'SUBMITTED → ACCEPTED', timestamp: date(3) },
    { id: id(704), actorEmail: 'thilini.oc@aiesec.lk', actorRole: 'OC_VIEWER', action: 'STATUS_UPDATED', targetType: 'Registration', targetId: ref(839), details: 'SUBMITTED → ACCEPTED', timestamp: date(2) },
    { id: id(705), actorEmail: 'super@admin.com', actorRole: 'SUPER_ADMIN', action: 'ADMIN_DEACTIVATED', targetType: 'Admin', targetId: id(503), details: 'Deactivated nuwan.oc@aiesec.lk', timestamp: date(1) },
    { id: id(706), actorEmail: 'kaveesha.oc@aiesec.lk', actorRole: 'OC_VIEWER', action: 'STATUS_UPDATED', targetType: 'Registration', targetId: ref(838), details: 'SUBMITTED → REJECTED', timestamp: date(0) },
];

export const mockCvs: CvEntry[] = mockRegistrations.filter(r => r.hasCv).map((r, i) => ({
    id: id(800 + i),
    participantName: r.participantName,
    entity: r.entity,
    registrationRef: r.referenceCode,
    uploadedAt: r.submittedAt,
    fileType: 'PDF',
}));

export const mockPhotos: PhotoEntry[] = mockRegistrations.filter(r => r.hasPhoto).map((r, i) => ({
    id: id(900 + i),
    participantName: r.participantName,
    entity: r.entity,
    uploadedAt: r.submittedAt,
}));

// Dashboard aggregates
export const mockDashboardStats = {
    total: mockRegistrations.length,
    submitted: mockRegistrations.filter(r => r.status === 'SUBMITTED').length,
    underReview: mockRegistrations.filter(r => r.status === 'UNDER_REVIEW').length,
    accepted: mockRegistrations.filter(r => r.status === 'ACCEPTED').length,
    rejected: mockRegistrations.filter(r => r.status === 'REJECTED').length,
    cancelled: mockRegistrations.filter(r => r.status === 'CANCELLED').length,
};

// Analytics
export const mockDailyRegistrations = Array.from({ length: 14 }, (_, i) => ({
    date: new Date(Date.now() - (13 - i) * 86400000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
    count: Math.floor(Math.random() * 25) + 5,
}));

export const mockEntityDistribution = ENTITIES.slice(0, 8).map(e => ({
    entity: e,
    count: Math.floor(Math.random() * 80) + 15,
})).sort((a, b) => b.count - a.count);
