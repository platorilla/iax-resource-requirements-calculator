import { useState, useEffect, useRef } from "react";
import React from "react";
import "@utils/wasm_exec";
import "@utils/ptk";
import "@utils/ptk.d.ts";
import type { PTKResourceRequirements } from "@utils/ptk.d.ts";

const App = () => {
  const [rr, setRR] = useState<PTKResourceRequirements>({
    requests: { cpuCores: 0, cpuMilli: 0, memoryGiB: 0, memoryBytes: 0 },
    limits: { cpuCores: 0, cpuMilli: 0, memoryGiB: 0, memoryBytes: 0 },
  });

  useEffect(() => {
    window.ptk.load().then(() => {
      console.log(window.ptk.version());
    });
  }, []);

  const clusterSizeRef = useRef<HTMLSelectElement>(null);
  const nodesRef = useRef<HTMLInputElement>(null);
  const isBetaRef = useRef<HTMLInputElement>(null);

  const prereqOpts = [
    {
      id: "iax_prerequisites_cert_manager_should_install",
      label: "Install Cert Manager?",
    },
    {
      id: "iax_prerequisites_linkerd_should_install",
      label: "Install Linkerd?",
    },
    {
      id: "iax_prerequisites_linkerd_cni_should_install",
      label: "Install Linkerd CNI?",
    },
    { id: "iax_prerequisites_nginx_should_install", label: "Install Nginx?" },
    {
      id: "iax_prerequisites_trust_manager_should_install",
      label: "Install Trust Manager?",
    },
  ];

  const appOpts = [
    { id: "iax_apps_alerting_should_install", label: "Install Alerting App?" },
    {
      id: "iax_apps_api_gateway_should_install",
      label: "Install API Gateway App?",
    },
    {
      id: "iax_apps_capacity_planner_should_install",
      label: "Install Capacity Planner App?",
    },
    { id: "iax_apps_commands_should_install", label: "Install Commands App?" },
    { id: "iax_apps_entities_should_install", label: "Install Entities App?" },
    {
      id: "iax_apps_fix_monitor_should_install",
      label: "Install Fix Monitor App?",
    },
    {
      id: "iax_apps_ingestion_should_install",
      label: "Install Ingestion App?",
    },
    {
      id: "iax_apps_notifications_should_install",
      label: "Install Notifications App?",
    },
    {
      id: "iax_apps_query_service_should_install",
      label: "Install Query Service App?",
    },
    {
      id: "iax_apps_signal_forecaster_should_install",
      label: "Install Signal Forecaster App?",
    },
    {
      id: "iax_apps_web_console_should_install",
      label: "Install Web Console App?",
    },
    {
      id: "iax_apps_dashboard_beta_should_install",
      label: "Install Dashboard Beta App?",
    },
  ];
  const inputRefs = new Map<string, React.RefObject<HTMLInputElement>>(
    [...prereqOpts, ...appOpts].map((item) => [
      item.id,
      React.createRef<HTMLInputElement>(),
    ]),
  );

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>CPU</th>
              <th>Memory</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Requests</td>
              <td>{rr.requests.cpuCores.toString()}</td>
              <td>{rr.requests.memoryGiB.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Limits</td>
              <td>{rr.limits.cpuCores.toString()}</td>
              <td>{rr.limits.memoryGiB.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="font-bold">Calculate Resource Requirements</h2>
        <ul>
          <li>
            <label>Number of nodes in the cluster</label>
            <input
              ref={nodesRef}
              type="text"
              placeholder="Nodes"
              defaultValue="1"
            />
          </li>
          <li>
            <label>Cluster size</label>
            <select ref={clusterSizeRef}>
              <option value="micro">Micro</option>
              <option value="small">Small</option>
              <option value="smallha">Small (Highly-Available)</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </li>
          {[...prereqOpts, ...appOpts].map((item) => (
            <li key={item.id}>
              <input
                ref={inputRefs.get(item.id)}
                type="checkbox"
                defaultChecked={false}
              />
              <label>{item.label}</label>
            </li>
          ))}
          <li>
            <input ref={isBetaRef} type="checkbox" defaultChecked={false} />
            <label>Install Beta Apps?</label>
          </li>
        </ul>
        <button
          className="btn rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          type="button"
          onClick={() =>
            window.ptk
              .calculateResourceRequirements({
                cluster: { nodes: parseInt(nodesRef.current!.value, 10) },
                configValues: {
                  cluster_settings_iax_cluster_size:
                    clusterSizeRef.current!.value,
                  iax_apps_install_type: isBetaRef.current!.checked
                    ? "beta_apps"
                    : "dont-care",
                  ...[...prereqOpts, ...appOpts].reduce(
                    (acc, item) => {
                      acc[item.id] = inputRefs.get(item.id)!.current!.checked
                        ? "1"
                        : "0";
                      return acc;
                    },
                    {} as Record<string, string>,
                  ),
                },
              })
              .then((rr) => {
                setRR(rr);
              })
          }
        >
          Calculate
        </button>
      </div>
    </>
  );
};

export default App;
