# Rename Application

## 패키지 변경

기존

- src/main/java/com/zucchini/sample
- ios/sample
- ios/sample.xcodeproj
- ios/sample.xcworkspace

변경

- src/main/java/com/zucchini/XXX
- ios/XXX
- ios/XXX.xcodeproj
- ios/XXX.xcworkspace

## 패키지 값 변경

기존: com.zucchini.sample
변경: com.zucchini.XXX

- build.gradle(:app)
- MainActivity.kt
- MainApplication.kt
- project.pbxproj

## 프로젝트 이름 변경

기존: sample
변경: XXX

- app.json
- package.json
- settings.gradle
- MainActivity.kt
- strings.xml
- Podfile
- AppDelegate.swift
- project.pbxproj
- sample.xcscheme
- contents.xcworkspacedata
- Info.plist
