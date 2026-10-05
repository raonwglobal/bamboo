'use client';
import { useState, useEffect, useRef } from 'react';

type Lang = 'KR' | 'EN' | 'VI' | 'JP';

const content = {
  KR: {
    eyebrow: "VIETNAM BUSINESS EXECUTION PLATFORM",
    heroTitle: "베트남 진출의 모든 과정을\n[ b/a ] 와 함께",
    heroSub: "법인설립, 거래·M&A, 산업별 현지화, 보안·준법, 현지 운영을 통합 지원합니다. 시장조사부터 사업 실행과 운영관리까지 복잡한 절차를 체계적으로 연결해 빠르고 안전한 베트남 사업 진입을 지원합니다.",
    heroCTA1: "실행 상담하기",
    heroCTA2: "서비스 상품 보기",
    nav: ["서비스","거래·M&A","산업별","보안·준법","운영지원","절차"],
    servicesEyebrow: "주요 서비스",
    servicesTitle: "진출부터 운영까지, 하나의 프로젝트로",
  },
  EN: {
    eyebrow: "VIETNAM BUSINESS EXECUTION PLATFORM",
    heroTitle: "Your Entire Vietnam Entry\nWith One Execution Partner",
    heroSub: "From incorporation and M&A to localization, compliance and operations. We connect complex steps into one systematic flow for fast and secure market entry.",
    heroCTA1: "Start Execution Call",
    heroCTA2: "View Service Plans",
    nav: ["Services","Deals","Industries","Security","Operations","Process"],
    servicesEyebrow: "CORE SERVICES",
    servicesTitle: "From entry to operations as one project",
  },
  VI: {
    eyebrow: "VIETNAM BUSINESS EXECUTION PLATFORM",
    heroTitle: "Toàn bộ hành trình vào\nViệt Nam cùng một đối tác",
    heroSub: "Hỗ trợ tích hợp thành lập pháp nhân, M&A, bản địa hóa theo ngành, bảo mật/tuân thủ và vận hành. Kết nối hệ thống từ nghiên cứu đến thực thi.",
    heroCTA1: "Tư vấn thực thi",
    heroCTA2: "Xem gói dịch vụ",
    nav: ["Dịch vụ","M&A","Ngành","Bảo mật","Vận hành","Quy trình"],
    servicesEyebrow: "DỊCH VỤ CHÍNH",
    servicesTitle: "Từ gia nhập đến vận hành trong một dự án",
  },
  JP: {
    eyebrow: "VIETNAM BUSINESS EXECUTION PLATFORM",
    heroTitle: "ベトナム進出の全工程を\n一つのパートナーと共に",
    heroSub: "法人設立、M&A、産業別ローカライズ、セキュリティ・コンプライアンス、現地運営を統合支援。調査から実行・運用までを体系的に接続します。",
    heroCTA1: "実行相談する",
    heroCTA2: "サービスプランを見る",
    nav: ["サービス","取引·M&A","産業別","セキュリティ","運営支援","手順"],
    servicesEyebrow: "主要サービス",
    servicesTitle: "進出から運営まで一つのプロジェクトとして",
  }
};
