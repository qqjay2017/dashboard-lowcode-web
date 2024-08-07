import { RecursionField } from "@formily/react";
import { get } from "lodash-es";
import { Helmet } from "react-helmet";

import PreviewPageProvider from "./PreviewPageProvider";
import { usePreviewDt } from "./usePreviewDt";

import { useAppSpin } from "@/application/hooks";
import {
  useBreakpoints,
  useDashboardFormInstance,
  useReportId,
} from "@/schema-component/hooks";

function PreviewPage() {
  const { reportId } = useReportId();

  const { render } = useAppSpin();

  const { data, isLoading } = usePreviewDt(reportId);

  const name = get(data, "name");
  const description = get(data, "description");
  const schema = get(data, "content", "{}") || "{}";

  const { breakpoint } = useBreakpoints(undefined, 200, document.body);

  const form = useDashboardFormInstance({
    designable: false,
    deps: [breakpoint],
  });
  if (!schema || isLoading || !form) {
    return render();
  }

  const json = JSON.parse(schema);

  const rootProps = {
    designWidthEnum: "1920",
    cols: 12,
    rows: 12,
    rowheight: 80,
    designWidth: 1920,
    designHeight: 1080,

    breakpoints: {
      showroom: 2600,
      desktop: 1300,
      tablet: 500,
      mobile: 0,
    },
    themeProvider: "technologyBlue",
    isDarkTheme: true,
    ...json.root,
  };
  const renderShema = {
    type: "void",
    properties: {
      DashboardRootPreview: {
        _isJSONSchemaObject: true,
        version: "2.0",
        type: "void",

        name: "DashboardRootPreview",

        "x-component": "DashboardRootPreview",
        "x-settings": "settings:root",
        "x-component-props": {
          ...rootProps,
        },
        properties: json?.schema?.properties,
      },
    },
  };

  return (
    <PreviewPageProvider
      {...rootProps}
      scope={{
        dashboardDt: data,
      }}
    >
      <RecursionField schema={renderShema} name="DashboardRootPreview" />
      <Helmet>
        <title>{name}</title>
        <meta name="description" content={description} />
      </Helmet>
    </PreviewPageProvider>
  );
}

export default PreviewPage;
