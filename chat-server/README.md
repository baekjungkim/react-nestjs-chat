# 채팅서버

* 채팅방 만들기
* 채팅목록
* 채팅메시지 목록

* 메시지 보내기
* 메시지 수신체크 - 해당 로직과 디비 모델은 좀 더 고민해보자...

유저인증 넣기 너무 귀찮은데...... 간편한 방법이 머가 있을까........................

일단 그냥 헤더와 쿼리스트링 사용...

* 마이그레이션 설정 수정

## message receive check logic

check 테이블에서 message, user 정보를 저장하지 않는다. insert 과부하 => check 테이블 제거

joinChat 테이블에서 lastMessage 정보를 가지고 있는다. 
  => 메시지 목록 조회시 마지막 메시지 id를 전달하여 lastMessage 업데이트?
  => 메시지 목록 조회시 lastMessage 아이디부터 Message 목록 갯수 
