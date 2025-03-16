// 플로우 등록
enum Flows {
  OnboardingV1 = 'OnboardingV1',
  OnboardingV2 = 'OnboardingV2',
}

// 이벤트 등록
enum Events {
  ContentPlay0 = 'content_play0',
  ContentPlay1 = 'content_play1',
  ContentPlay2 = 'content_play2',
  ContentPlay3 = 'content_play3',
}

// 플로우 하위 이벤트 등록
type FlowEvents = {
  [Flows.OnboardingV1]: Events.ContentPlay0;
  [Flows.OnboardingV2]:
    | Events.ContentPlay1
    | Events.ContentPlay2
    | Events.ContentPlay3;
};

// 이벤트와 함께 전달할 파라미터 등록
type FlowEventParams = {
  [Events.ContentPlay0]: {
    name: string;
  };
  [Events.ContentPlay1]: {
    id: string;
  };
  [Events.ContentPlay2]: {
    id: string;
  };
  [Events.ContentPlay3]: {
    id: string;
  };
};

// 로그 함수
export const logExperimentEvent = <F extends Flows>(
  flowName: F,
  eventName: FlowEvents[F],
  eventValues?: FlowEventParams[FlowEvents[F]],
) => {
  console.log(`[Experiment] ${flowName} - ${eventName}`, eventValues);
};
